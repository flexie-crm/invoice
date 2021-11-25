import { useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";

import Wrapper from "@components/invoice/Wrapper";
import HomeLink from "@components/invoice/HomeLink";
import InvoiceFooter from "@components/invoice/InvoiceFooter";
import Invoice from "@components/inv/Invoice";
import InvoiceHeader from "@components/invoice/InvoiceHeader";

export default function InvoiceDetails() {
  const router = useRouter();
  const { id: invoiceId } = router.query;
  const printInvoice = useRef();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["invoice", invoiceId || 0], () =>
      fetch("/api/get/token", {
        method: "POST",
        body: JSON.stringify({
          method: "FX_GET_INVOICE",
          data: {
            method: "POST",
            body: JSON.stringify({
              nivf: invoiceId,
            }),
          },
        }),
      }).then((res) => res.json())
    );

  const printHandler = useReactToPrint({
    content: () => printInvoice.current,
  });

  return (
    <>
      <Head>
        <title>Fatura {invoiceId && `#${invoiceId}`} | Flexie CRM</title>
      </Head>
      <Wrapper>
        <HomeLink />
        <InvoiceHeader
          className="invoice-page-header"
          status={data?.status}
          printHandler={printHandler}
        />
        {/* {data && <InvoiceBody invoice={data} />} */}
        {data && <Invoice ref={printInvoice} invoice={data} />}
      </Wrapper>
      {/* <InvoiceFooter status={data?.status} /> */}
    </>
  );
}
