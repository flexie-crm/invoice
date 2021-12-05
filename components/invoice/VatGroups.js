import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { isMobile } from "react-device-detect";

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
          {!isMobile && <ExTitle>Arsyeja e perjashtimit nga TVSH</ExTitle>}
          <LeftAlignTh>Artikuj</LeftAlignTh>
          {!isMobile && <LeftAlignTh>Kodi TVSH</LeftAlignTh>}
          <LeftAlignTh>Vlera Tatueshme</LeftAlignTh>
          <LeftAlignTh>Niveli TVSH</LeftAlignTh>
          <LeftAlignTh>Vlera TVSH</LeftAlignTh>
        </>
      }
    >
      {vatGroups?.map((vatData) => {
        return (
          <tr key={uuidv4()}>
            {!isMobile && <ExReason>{vatData.Ex ? vatData.Ex : "--"}</ExReason>}
            <LeftAlignTd>{vatData.NumOfItems}</LeftAlignTd>
            {!isMobile && <LeftAlignTd>{vatData.VatCode}</LeftAlignTd>}
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
        <LeftAlignTd colSpan={isMobile ? 2 : 4}>
          <strong>
            {currency} {totalBeforeVat}
          </strong>
        </LeftAlignTd>
        <LeftAlignTd colSpan="2">
          <strong>
            {currency} {totalVat}
          </strong>
        </LeftAlignTd>
      </tr>

      {currency != "ALL" && (
        <tr>
          <LeftAlignTd colSpan={isMobile ? 2 : 4}>
            <strong>ALL {totalBeforeVatAll}</strong>
          </LeftAlignTd>
          <LeftAlignTd colSpan="2">
            <strong>ALL {totalVatAll}</strong>
          </LeftAlignTd>
        </tr>
      )}
    </InvoiceTable>
  );
};

export default VatGroups;
