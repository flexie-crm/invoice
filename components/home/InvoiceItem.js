import Link from "next/link";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/sq";

import InvoiceStatus from "@shared/InvoiceStatus";
import { Heading2 } from "@shared/Headings";
import { fontStylesA } from "@shared/Typography";

import { formatCurrency, parseFloatExt } from "@utilities/Form";

const StyledLink = styled.a`
  display: grid;
  grid-template-rows: max-content 1fr;

  width: calc(100% + 50px);
  border: 2px solid transparent;
  border-radius: none;
  padding: 1rem 1.5rem;
  background: ${(props) => props.theme.color.invoiceItem.bg};

  text-decoration: none;
  transition: border 0.05s, background 0.05s;
  cursor: pointer;

  :hover {
    border-color: #7c5dfa;
  }

  :focus-visible {
    outline: 2px dotted #7c5dfa;
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: 6rem 10rem 1fr min-content min-content min-content;
    grid-template-rows: min-content;
    align-items: center;
    width: 100%;
    border-radius: 8px;
  }
`;

const Id = styled(Heading2)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-bottom: 1.5rem;
  font-size: 0.75rem;

  span {
    color: #7e88c3;
  }

  @media only screen and (min-width: 768px) {
    margin-bottom: initial;
  }
`;

const IssueDate = styled.div`
  ${fontStylesA}

  @media only screen and (min-width: 768px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
`;

const ClientName = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  ${fontStylesA}
  color: ${(props) => props.theme.color.text.bodyB};
  text-align: end;

  @media only screen and (min-width: 768px) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    margin-right: 2.5rem;
    text-align: initial;
  }
`;

const Total = styled(Heading2)`
  font-size: 1rem;
  white-space: nowrap;

  @media only screen and (min-width: 768px) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
  }
`;

const StyledInvoiceStatus = styled(InvoiceStatus)`
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  margin-left: auto;

  @media only screen and (min-width: 768px) {
    grid-column: 5 / 6;
    grid-row: 1 / 2;
    margin-left: 2.5rem;
    margin-right: 1.25rem;
  }
`;

const Arrow = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    display: initial;
    grid-column: 6 / 7;
    grid-row: 1 / 2;
  }
`;

export default function InvoiceItem({
  id,
  issueDate,
  clientName,
  invoiceType,
  currency,
  total,
  status,
  invoiceNumber,
}) {
  dayjs.locale("sq");

  return (
    <Link href={`/invoice/${id ?? 'not-found'}`} passHref={true} scroll={true}>
      <StyledLink>
        <Id>
          <span style={{ textTransform: "uppercase" }}>{invoiceType}</span>
        </Id>
        <IssueDate>Leshuar {dayjs(issueDate).format("DD MMM YYYY")}</IssueDate>
        {clientName ? (
          <ClientName
            dangerouslySetInnerHTML={{ __html: clientName }}
          ></ClientName>
        ) : (
          <ClientName></ClientName>
        )}
        <Total as="div">
          <span>{currency}</span>{" "}
          {formatCurrency(parseFloatExt(total || 0).toFixed(2))}
        </Total>
        <StyledInvoiceStatus status={status} />
        <Arrow>
          <svg width="7" height="10">
            <path
              d="M1 1l4 4-4 4"
              stroke="#7C5DFA"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </Arrow>
      </StyledLink>
    </Link>
  );
}
