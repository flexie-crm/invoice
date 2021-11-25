import { useState, useEffect } from "react";
import Head from "next/head";

import Main from "@home/Main";
import Wrapper from "@home/Wrapper";
import Header from "@home/Header";
import InvoicesList from "@home/InvoicesList";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";

// Heavy component, should be imported dynamically
// so we can have a better user experience
const CreateInvoiceForm = dynamic(() =>
  import("@components/CreateInvoiceForm")
);

export default function Home({ invoices, setInvoices }) {
  const [filter, setFilter] = useState(null);
  const [filteredInvoices, setFilteredInvoices] = useState(null);
  const [formIsOpen, setFormIsOpen] = useState(false);

  useEffect(() => {
    setFilteredInvoices(invoices);

    if (invoices && filter) {
      setFilteredInvoices(
        invoices.filter((invoice) => {
          return invoice.status === filter;
        })
      );
    }
  }, [invoices, filter]);

  return (
    <>
      <Head>
        <title>Fatura | Flexie CRM</title>
      </Head>
      <Main>
        {formIsOpen && (
          <CreateInvoiceForm
            invoices={invoices}
            setInvoices={setInvoices}
            setIsOpen={setFormIsOpen}
          />
        )}
        <Wrapper>
          <Header
            invoices={filteredInvoices}
            filter={filter}
            setFilter={setFilter}
            setFormIsOpen={setFormIsOpen}
          />
          <InvoicesList />
        </Wrapper>
      </Main>
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
