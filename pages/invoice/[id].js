import React, { useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";

import Wrapper from "@components/invoice/Wrapper";
import HomeLink from "@components/invoice/HomeLink";
import InvoiceHeader from "@components/invoice/InvoiceHeader";
import Invoice from "@components/invoice/Invoice";

export default function InvoiceDetails() {
  const router = useRouter();
  const { id: invoiceId } = router.query;
  const printInvoice = useRef();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      ["invoice", invoiceId || 0],
      () =>
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
        }).then((res) => res.json()),
      {
        staleTime: 5000,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
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
        {data && data?.nivf && <Invoice ref={printInvoice} invoice={data} />}
      </Wrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
