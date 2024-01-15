import { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import useTotals from "@store/totals";

import InvoiceItem from "./InvoiceItem";
import Button from "@shared/Buttons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export default function InvoicesList() {
  const updateInvoiceTotalCount = useTotals(
    (state) => state.updateInvoiceTotalCount
  );
  const [page, setPage] = useState(0);
  const themeContext = useContext(ThemeContext);
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      ["invoices", page],
      () =>
        fetch("/api/get/token", {
          method: "POST",
          body: JSON.stringify({
            method: "FX_GET_INVOICES",
            data: {
              method: "POST",
              body: JSON.stringify({
                page: page || 0,
                limit: 20,
              }),
            },
          }),
        }).then((res) => res.json()),
      {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3600,
        onSuccess: (data) => {
          data?.invoices.forEach((invoice) => {
            queryClient.setQueryData(["invoice", invoice.nivf], invoice);
          });
        },
      }
    );

  useEffect(() => {
    updateInvoiceTotalCount(data?.total || -1);
  }, [data]);

  return (
    <>
      <Wrapper>
        {isFetching ? (
          <div style={{ width: "100%" }}>
            <Skeleton
              baseColor={themeContext.color.invoiceItem.bg}
              highlightColor="#dbd2fe"
              count={20}
              height={76}
              style={{ display: "grid", width: "100%" }}
            />
          </div>
        ) : (
          data?.invoices?.map((invoice) => {
            return (
              <InvoiceItem
                key={invoice.nivf ?? Math.random()}
                id={invoice.nivf}
                issueDate={invoice.invoice_created_date}
                clientName={invoice.company}
                total={invoice.invoice_total_after_vat}
                currency={invoice.currency}
                invoiceType={invoice.invoice_type}
                status={invoice.status}
                invoiceNumber={invoice.invoice_number}
              />
            );
          })
        )}
        <div style={{ width: "100%" }} className="grid">
          <div
            style={{ justifyContent: "flex-start", padding: "0" }}
            className="flex col"
          >
            {page > 0 && (
              <Button
                className="mt-10 mr-10"
                type="button"
                secondary
                onClick={() => {
                  setPage((old) => old - 20);
                }}
              >
                20 Faturat e meparshme
              </Button>
            )}
            {data?.total > page && data?.invoices.length === 20 && (
              <Button
                className="mt-10"
                type="button"
                onClick={() => {
                  setPage((old) => old + 20);
                }}
              >
                20 Faturat e tjera
              </Button>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
}
