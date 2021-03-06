import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { isMobile as detectMobile } from "react-device-detect";

import localState from "@libs/localState";
import InvoiceTable from "./InvoiceTable";
import { formatCurrency, parseFloatExt } from "@utilities/Form";

const ExTitle = styled.th`
  text-align: left;
`;

const ExReason = styled.td`
  text-align: left;
`;

const LeftAlignTh = styled.th`
  text-align: ${(props) => (props.isMobile ? "left" : "right")};
`;

const LeftAlignTd = styled.td`
  text-align: ${(props) => (props.isMobile ? "left" : "right")};
`;

const VatGroups = ({
  vatGroups,
  totalBeforeVat,
  totalBeforeVatAll,
  totalVat,
  totalVatAll,
  currency,
  printing,
}) => {
  const [printingMode] = localState("@printingMode", "A4");
  const [isMobile, setIsMobile] = useState(detectMobile);

  useEffect(() => {
    if (printing && printingMode === "thermal") {
      setIsMobile(true);
    }
  }, []);

  return (
    <InvoiceTable
      headings={
        <>
          {!isMobile && <ExTitle>Arsyeja e perjashtimit nga TVSH</ExTitle>}
          <LeftAlignTh isMobile={isMobile}>Artikuj</LeftAlignTh>
          {!isMobile && <LeftAlignTh>Kodi TVSH</LeftAlignTh>}
          <LeftAlignTh
            dangerouslySetInnerHTML={{
              __html: isMobile ? "Vlera<br>Tatueshme" : "Vlera Tatueshme",
            }}
          />
          <LeftAlignTh
            dangerouslySetInnerHTML={{
              __html: isMobile ? "Shkalla<br>TVSH %" : "Shkalla TVSH %",
            }}
          />
          <LeftAlignTh
            dangerouslySetInnerHTML={{
              __html: isMobile ? "Vlera<br>TVSH" : "Vlera TVSH",
            }}
          />
        </>
      }
    >
      {vatGroups?.map((vatData) => {
        return (
          <tr key={uuidv4()}>
            {!isMobile && <ExReason>{vatData.Ex ? vatData.Ex : "--"}</ExReason>}
            <LeftAlignTd isMobile={isMobile}>{vatData.NumOfItems}</LeftAlignTd>
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
