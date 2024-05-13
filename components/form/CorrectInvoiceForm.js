import React, { useRef, useEffect, useState } from "react";
import Router from "next/router";

import serialize from "form-serialize";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import dayjs from "dayjs";

import Form from "@components/Form";
import Fields from "@components/Fields";
import Button from "@shared/Buttons";
import { CreateInvoiceFormButtons } from "@components/Components";

import { invoiceValidation } from "@data/Form";
import Backdrop from "@components/Backdrop";
import Loader from "@components/layout/Loader";

import useValidation from "@store/validations";
import useLoader from "@store/loaders";
import styled from "styled-components";

const Buttons = styled(CreateInvoiceFormButtons)`
  margin-top: auto;
  width: 100%;
`;

const CorrectInvoiceForm = ({ setIsOpen, invoiceToCorrect }) => {
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

      // Payment type and method
      data["payment_method"] = invoiceToCorrect?.payload?.payment_method;
      data["payment_type"] = invoiceToCorrect?.payload?.payment_type;

      // Add user stuff to data
      data["operator_code"] = session?.user?.operator_code;
      data["business_unit"] = session?.user?.business_unit;
      data["nipt"] = session?.user?.nipt;
      data["company_name"] = session?.user?.company;

      // Add NIVF reference and date issued
      data["nivf_reference"] = invoiceToCorrect?.nivf;
      data["nslf_reference"] = invoiceToCorrect?.nslf;
      data["invoice_created_date"] = invoiceToCorrect?.invoice_created_date;

      // Add original invoice type
      data["invoice_type_original"] = invoiceToCorrect?.payload?.invoice_type;

      if (invoiceToCorrect?.payload?.auto_invoice_type) {
        data["auto_invoice_type"] =
          invoiceToCorrect?.payload?.auto_invoice_type;
      }

      // Check if CASH so we should send TCR
      if (data.payment_method != "ACCOUNT") {
        data["tcr_code"] = session?.user?.tcr_code;
      }

      setIsFormPosting(true);

      const sendInvoice = await (
        await fetch("/api/get/token", {
          method: "POST",
          body: JSON.stringify({
            method: "FX_CORRECT_INVOICE",
            data: {
              method: "POST",
              body: JSON.stringify(data),
            },
          }),
        })
      ).json();

      if (sendInvoice?.ok) {
        // Do an optimistic update right away
        // queryClient.setQueryData(["invoices", 0], (old) => ({
        //   invoices: [sendInvoice, ...old.invoices],
        //   total: old.total + 1,
        // }));

        // Add invoce details into cache
        queryClient.setQueryData(["invoice", sendInvoice.nivf], sendInvoice);

        // Need to wait before triggering an update, and also clear cache
        setTimeout(() => queryClient.invalidateQueries("invoices"), 1500);

        // Redirect to invoice
        Router.push(`/invoice/${sendInvoice.nivf}`);

        setInvoiceSubmitError(false);
        setIsFormPosting(false);
        setIsOpen(false);
      } else if (sendInvoice?.active === false) {
        setIsFormPosting(false);
        setInvoiceSubmitError({
          type: "error",
          message:
            "Llogaria juaj nuk eshte aktive. Kontaktoni me suportin - support@flexie.io",
        });
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

      console.log(errors);

      setErrors(addErrors);
      setIsFormPosting(false);
    }
  }

  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  return (
    <>
      <Backdrop />
      <Form ref={form} setIsOpen={setIsOpen} onSubmit={onSubmit}>
        {isFormPosting && <Loader />}
        <Fields
          invoiceSubmitError={invoiceSubmitError}
          isCorrective={true}
          invoiceToCorrect={invoiceToCorrect}
        />
        <Buttons>
          <Button type="button" tertiary onClick={() => setIsOpen(false)}>
            Mbyll
          </Button>
          <Button disabled={isFormPosting} type="submit">
            {isFormPosting ? "Anullo..." : "Anullo"}
          </Button>
        </Buttons>
      </Form>
    </>
  );
};

export default React.memo(CorrectInvoiceForm);
