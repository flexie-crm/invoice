import React from "react";
import styled from "styled-components";

import InvoiceTable from "./InvoiceTable";

const CurrencyInfo = styled.td`
  width: 50%;
  font-size: 0.75rem;
  line-height: 1.5;
  padding-bottom: 0 !important;
`;

const Total = styled.td`
  color: #fb7578;
  text-align: right;
  padding-bottom: 0 !important;
`;

const Large = styled.span`
  font-size: 0.9rem;
`;

const CurrencyTitle = styled.th`
  text-align: left;
`;

const DueDateTitle = styled.th`
  text-align: left;
`;

const TotalTitle = styled.th`
  text-align: right;
`;

const Totals = ({
  accountNumber,
  routingNumber,
  dueDate,
  totalVat,
  totalVatAll,
  totalBeforeVat,
  totalBeforeVatAll,
  totalAfterVat,
  totalAfterVatAll,
  currency,
  currencyRate,
}) => (
  <InvoiceTable
    headings={
      <>
        <CurrencyTitle>Monedha</CurrencyTitle>
        <TotalTitle>SHUMA PER T'U PAGUAR</TotalTitle>
      </>
    }
  >
    <tr>
      <CurrencyInfo>{currency}</CurrencyInfo>
      <Total>
        <Large>
          <strong>{totalAfterVat}</strong>
        </Large>
      </Total>
    </tr>
    {currency != "ALL" && (
      <tr>
        <CurrencyInfo style={{ paddingTop: "0" }}>
          ALL - Kursi i këmbimit {currencyRate}
        </CurrencyInfo>
        <Total style={{ paddingTop: "0" }}>
          <Large>
            <strong>{totalAfterVatAll}</strong>
          </Large>
        </Total>
      </tr>
    )}
  </InvoiceTable>
);

export default Totals;
