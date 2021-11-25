import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import InvoiceTable from "./InvoiceTable";
import { formatCurrency, parseFloatExt } from "@utilities/Form";

const ExTitle = styled.th`
  text-align: left;
`;

const ExReason = styled.td`
  text-align: left;
`;

const LeftAlignTh = styled.th`
  text-align: right;
`;

const LeftAlignTd = styled.td`
  text-align: right;
`;

const VatGroups = ({
  vatGroups,
  totalBeforeVat,
  totalBeforeVatAll,
  totalVat,
  totalVatAll,
  currency,
}) => {
  return (
    <InvoiceTable
      headings={
        <>
          <ExTitle>Arsyeja e perjashtimit nga TVSH</ExTitle>
          <LeftAlignTh>Kodi TVSH</LeftAlignTh>
          <LeftAlignTh>Vlera Tatueshme</LeftAlignTh>
          <LeftAlignTh>Niveli TVSH</LeftAlignTh>
          <LeftAlignTh>Vlera TVSH</LeftAlignTh>
        </>
      }
    >
      {vatGroups?.map((vatData) => {
        return (
          <tr key={uuidv4()}>
            <ExReason>{vatData.Ex ? vatData.Ex : "--"}</ExReason>
            <LeftAlignTd>{vatData.VatCode}</LeftAlignTd>
            <LeftAlignTd>
              {formatCurrency(parseFloatExt(vatData.PriceBefVAT).toFixed(2))}
            </LeftAlignTd>
            <LeftAlignTd>{vatData.VatRate}%</LeftAlignTd>
            <LeftAlignTd>
              {formatCurrency(parseFloatExt(vatData.VATAmt).toFixed(2))}
            </LeftAlignTd>
          </tr>
        );
      })}

      <tr>
        <td></td>
        <td></td>
        <LeftAlignTd>
          <strong>
            {currency} {totalBeforeVat}
          </strong>
        </LeftAlignTd>
        <td></td>
        <LeftAlignTd>
          <strong>
            {currency} {totalVat}
          </strong>
        </LeftAlignTd>
      </tr>

      {currency != "ALL" && (
        <tr>
          <td></td>
          <td></td>
          <LeftAlignTd>
            <strong>ALL {totalBeforeVatAll}</strong>
          </LeftAlignTd>
          <td></td>
          <LeftAlignTd>
            <strong>ALL {totalVatAll}</strong>
          </LeftAlignTd>
        </tr>
      )}
    </InvoiceTable>
  );
};

export default VatGroups;
