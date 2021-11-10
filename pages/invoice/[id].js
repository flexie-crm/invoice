import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Wrapper from "@components/invoice/Wrapper";
import HomeLink from "@components/invoice/HomeLink";
import InvoiceHeader from "@components/invoice/InvoiceHeader";
import InvoiceBody from "@components/invoice/InvoiceBody";
import InvoiceFooter from "@components/invoice/InvoiceFooter";

import { markAsPaid } from "@utilities/Invoices";

export default function Invoice({ invoices, setInvoices, handleDelete }) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    setId(router.query.id);
    setInvoice(invoices?.find((invoice) => router.query.id === invoice.id));
  }, [router.query, invoices]);

  function handlePaid() {
    markAsPaid(id, invoices, setInvoices);
  }

  return (
    <>
      <Head>
        <title>Fatura {id && `#${id}`} | Flexie CRM</title>
      </Head>
      <Wrapper>
        <HomeLink />
        <InvoiceHeader
          className="invoice-page-header"
          status={invoice?.status}
          handlePaid={handlePaid}
        />
        {invoice && <InvoiceBody invoice={invoice} />}
      </Wrapper>
      <InvoiceFooter status={invoice?.status} handlePaid={handlePaid} />
    </>
  );
}
