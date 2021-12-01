import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStylesB } from "@shared/Typography";

const InvoiceTableContainer = styled.table`
  margin: 1.5rem 0;
  font-size: 0.875rem;

  th {
    ${fontStylesB}
    border-bottom: 2px solid #373b53;
    padding: 6px 0 2px 0;
    text-transform: uppercase;
  }

  td {
    padding: 2px 0;
    ${fontStylesB}
    font-size: 80%;
  }

  tbody tr:first-child td {
    padding-top: 10px;
  }

  ${({ hasBottomBorder }) =>
    hasBottomBorder &&
    `
    margin-bottom: 0;

    tbody tr:last-child td {
      padding-bottom: 25px;
      border-bottom: 2px solid #ddd;
    }
  `}
`;

const InvoiceTable = ({ headings, children, hasBottomBorder, ...rest }) => (
  <InvoiceTableContainer hasBottomBorder={hasBottomBorder} {...rest}>
    <thead>
      <tr>{headings}</tr>
    </thead>
    <tbody>{children}</tbody>
  </InvoiceTableContainer>
);

InvoiceTable.defaultProps = {
  hasBottomBorder: false,
};

InvoiceTable.propTypes = {
  headings: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  hasBottomBorder: PropTypes.bool,
};

export default InvoiceTable;
