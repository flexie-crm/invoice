import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import "dayjs/locale/sq";
import { formatCurrency, parseFloatExt } from "@utilities/Form";

import GlobalStyle from "./GlobalStyle";
import InvoiceInfo from "./InvoiceInfo";
import LineItems from "./LineItems";
import Totals from "./Totals";
import VatGroups from "./VatGroups";

const Container = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 1.5rem;
  background: ${(props) => props.theme.color.invoiceItem.bg};

  @media print {
    box-shadow: none;
    border-radius: 0;
  }
`;

const Invoice = (props, ref) => {
  const { invoice } = props;

  dayjs.locale("sq");

  return (
    <Container ref={ref}>
      <GlobalStyle />
      <InvoiceInfo
        invoiceNumber={invoice.invoice_number}
        invoiceDate={dayjs(invoice.invoice_created_date).format("DD MMM, YYYY")}
        nuis={invoice.nuis}
        companyName={invoice.company}
        address={invoice.address}
        cityCountry={`${invoice.city}, ${invoice.country_code}`}
        qrCode={invoice.qr_code_url}
        nivf={invoice.nivf}
        nslf={invoice.nslf}
        {...(invoice.due_date
          ? { dueDate: `${dayjs(invoice.due_date).format("DD MMM, YYYY")}` }
          : {})}
      />
      <LineItems items={invoice?.payload?.items || []} />

      <VatGroups
        vatGroups={invoice.vat_groups}
        currency={invoice.currency}
        totalVat={formatCurrency(
          parseFloatExt(invoice.invoice_total_vat).toFixed(2)
        )}
        totalVatAll={formatCurrency(
          parseFloatExt(invoice.invoice_total_vat_all).toFixed(2)
        )}
        totalBeforeVat={formatCurrency(
          parseFloatExt(invoice.invoice_total_before_vat).toFixed(2)
        )}
        totalBeforeVatAll={formatCurrency(
          parseFloatExt(invoice.invoice_total_before_vat_all).toFixed(2)
        )}
      />

      <Totals
        accountNumber="123567744"
        routingNumber="120000547"
        currency={invoice.currency}
        currencyRate={formatCurrency(
          parseFloatExt(invoice.currency_rate).toFixed(2)
        )}
        totalVat={formatCurrency(
          parseFloatExt(invoice.invoice_total_vat).toFixed(2)
        )}
        totalVatAll={formatCurrency(
          parseFloatExt(invoice.invoice_total_vat_all).toFixed(2)
        )}
        totalBeforeVat={formatCurrency(
          parseFloatExt(invoice.invoice_total_before_vat).toFixed(2)
        )}
        totalBeforeVatAll={formatCurrency(
          parseFloatExt(invoice.invoice_total_before_vat_all).toFixed(2)
        )}
        totalAfterVat={formatCurrency(
          parseFloatExt(invoice.invoice_total_after_vat).toFixed(2)
        )}
        totalAfterVatAll={formatCurrency(
          parseFloatExt(invoice.invoice_total_after_vat_all).toFixed(2)
        )}
        {...(invoice.due_date
          ? { dueDate: `${dayjs(invoice.due_date).format("DD MMM, YYYY")}` }
          : {})}
      />
    </Container>
  );
};

export default React.forwardRef(Invoice);
