import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { isMobile } from "react-device-detect";

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

const LineItems = ({ items }) => (
  <InvoiceTable
    headings={
      <>
        <Description>Artikulli</Description>
        {!isMobile && <Quantity>Sasia</Quantity>}
        <Price>Çmimi</Price>
        <Vat>TVSH</Vat>
        <TotalTitle>Totali</TotalTitle>
      </>
    }
  >
    {items.map((item, i) => {
      const getItem = getJson(item.item);
      const itemName = getItem ? getItem.__label : item.item;

      return (
        <tr key={uuidv4()}>
          <td>{itemName}</td>
          {!isMobile && <RightAlignedCell>{item.qty}</RightAlignedCell>}
          <RightAlignedCell>
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
      );
    })}
  </InvoiceTable>
);

export default LineItems;
