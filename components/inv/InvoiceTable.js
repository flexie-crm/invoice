import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStylesB } from "@shared/Typography";

const InvoiceTableContainer = styled.table`
  margin: 3rem 0;
  font-size: 0.875rem;

  @media print {
    @page {
      margin-top: 20px;
      margin-bottom: 10px;
      margin-left: 5px;
      margin-right: 5px;
    }

    @page :first {
      margin-top: 0;
    }

    @page {
      @bottom-right {
        content: "Gjeneruar nga Flexie CRM";
      }
    }

    html,
    body {
      width: 100%;
      margin: 0;
    }

    thead {
      display: table-header-group;
    }

    table {
      word-wrap: break-word;
    }

    table td {
      word-break: break-all;
    }
  }

  th {
    ${fontStylesB}
    border-bottom: 2px solid #373b53;
    padding: 10px 0 10px 0;
    text-transform: uppercase;
  }

  td {
    padding: 4px 0;
    ${fontStylesB}
    font-size: 0.7rem;
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

const InvoiceTable = ({ headings, children, hasBottomBorder }) => (
  <InvoiceTableContainer hasBottomBorder={hasBottomBorder}>
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
