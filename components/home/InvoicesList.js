import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import InvoiceItem from "./InvoiceItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export default function InvoicesList({ invoices }) {
  const [page, setPage] = useState(0);

  const fetchInvoices = (page = 0) =>
    fetch("/api/get/token", {
      method: "POST",
      body: JSON.stringify({
        method: "FX_GET_INVOICES",
        data: {
          method: "POST",
          body: JSON.stringify({
            page: page,
            limit: 30,
          }),
        },
      }),
    }).then((res) => res.json());

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["invoices", page], () => fetchInvoices(page), {
      keepPreviousData: true,
    });

  useEffect(() => {
    console.log(isLoading, isError, error, data, isFetching, isPreviousData);
  }, [data]);

  return (
    <>
      {data && (
        <Wrapper>
          {data.map((invoice) => {
            return (
              <InvoiceItem
                key={invoice.id}
                id={invoice.id}
                issueDate={invoice.invoice_created_date}
                clientName={invoice.company}
                total={invoice.invoice_total_after_vat}
                currency={invoice.currency}
                invoiceType={invoice.invoice_type}
                status="paguar"
              />
            );
          })}
        </Wrapper>
      )}
    </>
  );
}
