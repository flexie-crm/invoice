import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";

import Wrapper from "@components/invoice/Wrapper";
import HomeLink from "@components/invoice/HomeLink";
import InvoiceHeader from "@components/invoice/InvoiceHeader";
import Invoice from "@components/invoice/Invoice";
import NothingHere from "@shared/NothingHere";

const NothingHereOverride = styled(NothingHere)`
  &.nothing-here-override {
    min-height: calc(100vh - 186px);
  }

  .illustration-wrapper {
    padding-bottom: 1.5rem;
  }

  p {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

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
        {data && data?.nivf ? (
          <>
            <HomeLink />
            <InvoiceHeader
              className="invoice-page-header"
              status={data?.status}
              printHandler={printHandler}
            />
            <Invoice invoice={data} />
            <div style={{ display: "none" }}>
              <Invoice ref={printInvoice} invoice={data} printing={true} />
            </div>
          </>
        ) : (
          !isLoading &&
          !isFetching && (
            <NothingHereOverride className="nothing-here-override" />
          )
        )}
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
