import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
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
        <Quantity className="hidden-xs">Sasia</Quantity>
        <Price className="hidden-xs">Çmimi</Price>
        <Vat className="hidden-xs hidden-sm">TVSH</Vat>
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
          <RightAlignedCell className="hidden-xs">{item.qty}</RightAlignedCell>
          <RightAlignedCell className="hidden-xs">
            {formatCurrency(parseFloatExt(item.price).toFixed(2))}
          </RightAlignedCell>
          <RightAlignedCell className="hidden-xs hidden-sm">
            {formatCurrency(parseFloatExt(item.vat).toFixed(2))}
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
