import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";

import Wrapper from "@components/invoice/Wrapper";
import HomeLink from "@components/invoice/HomeLink";
import InvoiceHeader from "@components/invoice/InvoiceHeader";
import InvoiceBody from "@components/invoice/InvoiceBody";
import InvoiceFooter from "@components/invoice/InvoiceFooter";

export default function Invoice() {
  const router = useRouter();
  const [id, setId] = useState(null);

  const fetchInvoice = (id) => {
    if (id)
      fetch("/api/get/token", {
        method: "POST",
        body: JSON.stringify({
          method: "FX_GET_INVOICE",
          data: {
            method: "POST",
            body: JSON.stringify({
              nivf: id,
            }),
          },
        }),
      }).then((res) => res.json());
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      ["invoice", router.query.id],
      () => fetchInvoice(router.query.id),
      {
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    setId(router.query.id);
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Fatura {router.query.id && `#${id}`} | Flexie CRM</title>
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
