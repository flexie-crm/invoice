import React, { useRef, useEffect, useState } from "react";
import Router from "next/router";

import serialize from "form-serialize";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import dayjs from "dayjs";

import Form from "@components/Form";
import Fields from "@components/Fields";
import Button from "@shared/Buttons";
import { CreateInvoiceFormButtons as Buttons } from "@components/Components";

import { invoiceValidation } from "@data/Form";
import Backdrop from "@components/Backdrop";
import Loader from "@components/layout/Loader";

import { createInvoice } from "@utilities/Form";
import { generateUniqueId } from "@utilities/Id";
import { addInvoice } from "@utilities/Invoices";
import useValidation from "@store/validations";
import useLoader from "@store/loaders";

import { SubmissionMessage } from "@shared/SharedStyle";

const CreateInvoiceForm = ({ invoices, setInvoices, setIsOpen }) => {
  const form = useRef();
  const [invoiceSubmitError, setInvoiceSubmitError] = useState();
  const hasErrors = useValidation((state) => state.hasErrors);
  const setErrors = useValidation((state) => state.setErrors);
  const isFormPosting = useLoader((state) => state.isFormPosting);
  const { setIsFormLoading, setIsFormPosting } = useLoader((state) => ({
    setIsFormLoading: state.setIsFormLoading,
    setIsFormPosting: state.setIsFormPosting,
  }));

  // Get session, so we can sent user data to this invoice
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  async function onSubmit(event) {
    event.preventDefault();
    const data = serialize(form.current, { hash: true });

    try {
      await invoiceValidation.validate(data, {
        abortEarly: false,
      });

      // Check also global has error
      if (hasErrors) {
        return false;
      }

      // Check period start and period end
      // as they are kind of complex to be handled from YUP
      if (data.period_start && data.period_end) {
        const startDate = dayjs(data.period_start, "YYYY-MM-DD");
        const endDate = dayjs(data.period_end, "YYYY-MM-DD");

        if (endDate.isBefore(startDate) || endDate.isSame(startDate)) {
          setErrors({
            period_start: "- duhet me heret.",
            period_end: "- duhet me vone.",
          });

          return false;
        }

        if (!startDate.isSame(endDate, "month")) {
          setErrors({
            period_start: "- duhet brenda muajit.",
            period_end: "- duhet brenda muajit.",
          });

          return false;
        }
      }

      if (data.period_start && !data.period_end) {
        setErrors({
          period_end: "- duhet vendosur.",
        });

        return false;
      }

      if (!data.period_start && data.period_end) {
        setErrors({
          period_start: "- duhet vendosur.",
        });

        return false;
      }

      // Add user stuff to data
      data["operator_code"] = session?.user?.operator_code;
      data["business_unit"] = session?.user?.business_unit;
      data["nipt"] = session?.user?.nipt;
      data["company_name"] = session?.user?.company;

      // Check if CASH so we should send TCR
      if (data.payment_method != "ACCOUNT") {
        data["tcr_code"] = session?.user?.tcr_code;
      }

      setIsFormPosting(true);

      const sendInvoice = await (
        await fetch("/api/get/token", {
          method: "POST",
          body: JSON.stringify({
            method: "FX_NEW_INVOICE",
            data: {
              method: "POST",
              body: JSON.stringify(data),
            },
          }),
        })
      ).json();

      if (sendInvoice?.ok) {
        // Do an optimistic update right away
        queryClient.setQueryData(["invoices", 0], (old) => ({
          invoices: [sendInvoice, ...old.invoices],
          total: old.total + 1,
        }));

        // Add invoce details into cache
        queryClient.setQueryData(["invoice", sendInvoice.nivf], sendInvoice);

        // Need to wait before triggering an update, and also clear cache
        setTimeout(() => queryClient.invalidateQueries("invoices"), 1500);

        // Redirect to invoice
        Router.push(`/invoice/${sendInvoice.nivf}`);

        setInvoiceSubmitError(false);
        setIsFormPosting(false);
        setIsOpen(false);
      } else {
        setIsFormPosting(false);
        setInvoiceSubmitError({
          type: "error",
          message: sendInvoice?.fz_error_message
            ? `Ndodhi nje problem me faturen: ${sendInvoice?.fz_error_message}`
            : "Ndodhi nje problem me faturen, provoje perseri.",
        });
      }
    } catch (errors) {
      let addErrors = {};

      errors?.inner?.map((err) => {
        addErrors = { ...addErrors, [err.path]: err.message };
      });

      setErrors(addErrors);
      setIsFormPosting(false);
    }
  }

  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  function addDraft(values) {
    const newInvoice = {
      ...createInvoice("draft", values),
      id: generateUniqueId(invoices),
    };
    addInvoice(newInvoice, invoices, setInvoices);
    setIsOpen(false);
  }

  return (
    <>
      <Backdrop />
      <Form ref={form} setIsOpen={setIsOpen} onSubmit={onSubmit}>
        {isFormPosting && <Loader />}
        <Fields />
        {invoiceSubmitError && (
          <SubmissionMessage
            style={{ margin: "0 30px 0 30px" }}
            messageType={invoiceSubmitError.type}
            dangerouslySetInnerHTML={{ __html: invoiceSubmitError.message }}
          ></SubmissionMessage>
        )}
        <Buttons>
          <Button type="button" tertiary onClick={() => setIsOpen(false)}>
            Mbyll
          </Button>
          <Button disabled={isFormPosting} type="submit">
            {isFormPosting ? "Fiskalizo..." : "Fiskalizo"}
          </Button>
        </Buttons>
      </Form>
    </>
  );
};

export default React.memo(CreateInvoiceForm);
