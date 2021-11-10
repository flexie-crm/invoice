import React, { useRef, useEffect } from "react";
import serialize from "form-serialize";
import { useSession } from "next-auth/react";

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

const CreateInvoiceForm = ({ invoices, setInvoices, setIsOpen }) => {
  const form = useRef();
  const hasErrors = useValidation((state) => state.hasErrors);
  const setErrors = useValidation((state) => state.setErrors);
  const isFormPosting = useLoader((state) => state.isFormPosting);
  const { setIsFormLoading, setIsFormPosting } = useLoader((state) => ({
    setIsFormLoading: state.setIsFormLoading,
    setIsFormPosting: state.setIsFormPosting,
  }));

  // Get session, so we can sent user data to this invoice
  const { data: session } = useSession();

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

      // Add user stuff to data
      data["operator_code"] = session?.user?.operator_code;
      data["business_unit"] = session?.user?.business_unit;
      data["nipt"] = session?.user?.nipt;
      data["key"] = session?.user?.key;
      data["tcr_code"] = session?.user?.tcr_code;

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

      if (sendInvoice) {
        console.log(sendInvoice);
        setIsFormPosting(false);
        setIsOpen(false);
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
        <Buttons>
          <Button type="button" secondary onClick={() => setIsOpen(false)}>
            Mbyll
          </Button>
          <Button type="button" tertiary onClick={() => addDraft(values)}>
            Draft
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
