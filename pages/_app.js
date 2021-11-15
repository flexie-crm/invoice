import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Head from "next/head";
import Store from "store";
import data from "@data/data.json";

import Layout from "@components/layout/Layout";
import { deleteInvoice } from "@utilities/Invoices";

const queryClient = new QueryClient();

export default function App({ Component, pageProps, router, session }) {
  const [invoices, setInvoices] = useState(null);

  useEffect(async () => {
    if (Store.get("invoices") !== undefined) {
      setInvoices(Store.get("invoices"));
    } else {
      Store.set("invoices", data);
    }
  }, [setInvoices]);

  function handleDelete(id, closePopup) {
    closePopup(false);
    router.push("/");
    deleteInvoice(id, invoices, setInvoices);
  }

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <link rel="icon" href="/images/favicon.ico" type="image/icon" />
        </Head>
        <Layout>
          <Component
            {...pageProps}
            invoices={invoices}
            setInvoices={setInvoices}
            handleDelete={handleDelete}
            key={router.route}
          />
          <ReactQueryDevtools position="bottom-right" />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}
