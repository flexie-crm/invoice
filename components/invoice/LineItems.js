import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { isMobile as detectMobile } from "react-device-detect";

import localState from "@libs/localState";
import { getJson } from "@utilities/Misc";
import { formatCurrency, parseFloatExt } from "@utilities/Form";

import InvoiceTable from "./InvoiceTable";

const Quantity = styled.th`
  width: 50px;
  text-align: right;
  vertical-align: top;
`;

const Description = styled.th`
  text-align: left;
  vertical-align: top;
`;

const Price = styled.th`
  width: 100px;
  text-align: right;
  vertical-align: top;
`;

const TotalTitle = styled.th`
  width: 100px;
  text-align: right;
  vertical-align: top;
`;

const Vat = styled.th`
  width: 100px;
  text-align: right;
  vertical-align: top;
`;

const RightAlignedCell = styled.td`
  text-align: right;
  vertical-align: top;
`;

const LeftAlignedCell = styled.td`
  text-align: left;
  vertical-align: top;
`;

const Total = styled.td`
  text-align: right;
  vertical-align: top;
`;

const LineItems = ({ items, printing }) => {
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
        <React.Fragment key={uuidv4()}>
          {!isMobile && <Description>Artikulli</Description>}
          {!isMobile && <Quantity>Sasia</Quantity>}
          <Price
            style={isMobile ? { textAlign: "left" } : { textAlign: "right" }}
          >
            Çmimi
          </Price>
          <Vat>TVSH</Vat>
          <TotalTitle>Totali</TotalTitle>
        </React.Fragment>
      }
    >
      {items.map((item, index) => {
        const getItem = getJson(item.item);
        const itemName = getItem ? getItem.__label : item.item;

        return (
          <React.Fragment key={index}>
            {isMobile && (
              <tr>
                <td colSpan={3}>{itemName}</td>
              </tr>
            )}
            <tr>
              {!isMobile && <td>{itemName}</td>}
              {!isMobile && <RightAlignedCell>{item.qty}</RightAlignedCell>}
              <RightAlignedCell
                style={
                  isMobile ? { textAlign: "left" } : { textAlign: "right" }
                }
              >
                {isMobile && (
                  <span>
                    {item.qty} <b>x</b>{" "}
                  </span>
                )}
                {formatCurrency(parseFloatExt(item.price).toFixed(2))}
              </RightAlignedCell>
              <RightAlignedCell>
                {formatCurrency(parseFloatExt(item.vat_total).toFixed(2))}
              </RightAlignedCell>
              <Total>
                <strong>
                  {formatCurrency(parseFloatExt(item.total).toFixed(2))}
                </strong>
              </Total>
            </tr>
          </React.Fragment>
        );
      })}
    </InvoiceTable>
  );
};

export default LineItems;
