import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";
import dynamic from "next/dynamic";

import Wrapper from "@components/invoice/Wrapper";
import HomeLink from "@components/invoice/HomeLink";
import InvoiceHeader from "@components/invoice/InvoiceHeader";
import Invoice from "@components/invoice/Invoice";
import NothingHere from "@shared/NothingHere";

// Heavy component, should be imported dynamically
// so we can have a better user experience
const CorrectInvoiceForm = dynamic(() =>
  import("@components/CorrectInvoiceForm")
);

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
  const [correctiveIsOpen, setCorrectiveIsOpen] = useState(false);

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
      {correctiveIsOpen && (
        <CorrectInvoiceForm
          setIsOpen={setCorrectiveIsOpen}
          invoiceToCorrect={data}
        />
      )}
      <Wrapper>
        {data && data?.nivf ? (
          <>
            <HomeLink />
            <InvoiceHeader
              className="invoice-page-header"
              status={data?.status}
              type={data?.invoice_type}
              printHandler={printHandler}
              setCorrectiveIsOpen={setCorrectiveIsOpen}
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
