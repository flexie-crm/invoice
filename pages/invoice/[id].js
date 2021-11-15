import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Wrapper from "@components/invoice/Wrapper";
import HomeLink from "@components/invoice/HomeLink";
import InvoiceHeader from "@components/invoice/InvoiceHeader";
import InvoiceBody from "@components/invoice/InvoiceBody";
import InvoiceFooter from "@components/invoice/InvoiceFooter";

export default function Invoice() {
  const router = useRouter();
  const { id: invoiceId } = router.query;

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["invoice", invoiceId], () =>
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

  return (
    <>
      <Head>
        <title>Fatura {invoiceId && `#${invoiceId}`} | Flexie CRM</title>
      </Head>
      <Wrapper>
        <HomeLink />
        <InvoiceHeader className="invoice-page-header" status={data?.status} />
        {data && <InvoiceBody invoice={data} />}
      </Wrapper>
      <InvoiceFooter status={data?.status} />
    </>
  );
}
