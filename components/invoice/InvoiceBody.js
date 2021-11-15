import styled from "styled-components";
import dayjs from "dayjs";

import InvoiceTable from "./InvoiceTable";
import { Heading1, Heading3 } from "@shared/Headings";
import { fontStylesA, fontStylesB } from "@shared/Typography";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 2rem;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 1.5rem;
  background: ${(props) => props.theme.color.invoiceItem.bg};

  .invoice-table {
    grid-column: 1 / -1;
    grid-row: 6 / 7;
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 1.25rem;
  }
`;

// title
const Title = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
`;

const Id = styled(Heading1)`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;

  span {
    color: #7e88c3;
  }

  @media only screen and (min-width: 768px) {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
`;

const Description = styled.span`
  ${fontStylesA}
`;

// sender address
const SenderAddress = styled.address`
  display: flex;
  flex-direction: column;
  ${fontStylesB}
  font-style: normal;

  @media only screen and (min-width: 768px) {
    text-align: end;
  }
`;

// dates
const Dates = styled.div`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const Date = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateTitle = styled.span`
  margin-bottom: 0.25rem;
  ${fontStylesB}
  font-size: .75rem;
`;

const Subheading = styled(Heading3)`
  text-decoration: none;

  && {
    font-size: 0.9375rem;
  }
`;

// client address
const ClientAddress = styled.address`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  ${fontStylesB}
  font-style: normal;

  & *:nth-child(1) {
    margin-bottom: 0.5rem;
  }

  & *:nth-child(2) {
    margin-bottom: 0.25rem;
  }
`;

// client email
const Email = styled.div`
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 768px) {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
  }
`;

const EmailTitle = styled.span`
  margin-bottom: 0.25rem;
  ${fontStylesB}
  font-size: .75rem;
`;

export default function InvoiceBody({ invoice }) {
  return (
    <Wrapper>
      <Title>
        <Id>
          <span>#</span>
          {23445234534}
        </Id>
        <Description>FAture B2B</Description>
      </Title>

      <SenderAddress>
        <span>Rruga Panorama</span>
        <span>Tirane</span>
        <span>1016</span>
        <span>ALB</span>
      </SenderAddress>

      <Dates>
        <Date>
          <DateTitle>Data fatures</DateTitle>
          <Subheading as="span">
            {dayjs(invoice.invoice_created_date).format("DD MMM YYYY")}
          </Subheading>
        </Date>
        <Date>
          <DateTitle>Afati pageses</DateTitle>
          <Subheading as="span">24 Dhjetor 2021</Subheading>
        </Date>
      </Dates>

      <ClientAddress>
        <div>Bill To</div>
        <Subheading as="div">RT Software GROUP sh.p.k</Subheading>
        <span>Rruga Barrikadave</span>
        <span>Tirane</span>
        <span>1016</span>
        <span>ALB</span>
      </ClientAddress>

      <Email>
        <EmailTitle>Derguar</EmailTitle>
        <Subheading as="a" href={`mailto:sales@rtsg.io`}>
          sales@rtsg.io
        </Subheading>
      </Email>

      <InvoiceTable
        className="invoice-table"
        items={invoice.payload.items}
        total={invoice.invoice_total_after_vat}
      />
    </Wrapper>
  );
}
