import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { isMobile as detectMobile } from "react-device-detect";
import dayjs from "dayjs";
import "dayjs/locale/sq";

import { formatCurrency, parseFloatExt } from "@utilities/Form";
import { fontStylesB } from "@shared/Typography";
import localState from "@libs/localState";

import GlobalStyle from "./GlobalStyle";
import InvoiceInfo from "./InvoiceInfo";
import LineItems from "./LineItems";
import Totals from "./Totals";
import VatGroups from "./VatGroups";
import PaymentDetails from "./PaymentDetails";

import QrCode from "@components/invoice/QrCode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 1.5rem;
  background: ${(props) => props.theme.color.invoiceItem.bg};

  @media print {
    box-shadow: none;
    border-radius: 0;
    margin-top: 0;
    padding: 2mm;
  }
`;

const QrCodeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    ${fontStylesB}
    margin-top: 4px;
    letter-spacing: 0.05rem;
  }

  @media print {
    span {
      color: #000;
    }
  }
`;

const Invoice = (props, ref) => {
  const themeContext = useContext(ThemeContext);
  const { invoice, printing } = props;
  dayjs.locale("sq");

  const [mounted, setMounted] = useState(false);
  const [printingMode] = localState("@printingMode", "A4");
  const [isMobile, setIsMobile] = useState(detectMobile);

  useEffect(() => {
    setMounted(true);

    if (printing && printingMode === "thermal") {
      setIsMobile(true);
    }
  }, []);

  return (
    <Container ref={ref}>
      <GlobalStyle />
      <InvoiceInfo
        printing={printing}
        invoice={invoice}
        invoiceType={invoice.invoice_type}
        invoiceNumber={invoice.invoice_number}
        invoiceDate={dayjs(invoice.invoice_created_date).format(
          "DD MMMM, YYYY"
        )}
        nuis={invoice.nuis}
        companyName={invoice.company}
        address={invoice.address}
        cityCountry={`${invoice.city}, ${invoice.country_code}`}
        qrCode={invoice.qr_code_url}
        nivf={invoice.nivf}
        nslf={invoice.nslf}
        {...(invoice.due_date
          ? { dueDate: `${dayjs(invoice.due_date).format("DD MMMM, YYYY")}` }
          : {})}
      />

      <LineItems printing={printing} items={invoice?.payload?.items || []} />

      <VatGroups
        printing={printing}
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
        printing={printing}
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
          ? { dueDate: `${dayjs(invoice.due_date).format("DD MMMM, YYYY")}` }
          : {})}
      />

      {invoice?.payload?.payment_method == "ACCOUNT" &&
        invoice.invoice_type == "b2b" &&
        invoice.country_code == "ALB" && (
          <PaymentDetails
            printing={printing}
            invoice={invoice}
            payload={invoice?.payload}
            {...(invoice.due_date
              ? {
                  dueDate: `${dayjs(invoice.due_date).format("DD MMMM, YYYY")}`,
                }
              : {})}
          />
        )}

      {isMobile && (
        <div className="grid">
          <div className="col col-12 mb-20">
            <QrCodeSection>
              {mounted ? (
                <QrCode size={120} value={invoice?.qr_code_url || "UNKNOWN"} />
              ) : (
                <Skeleton
                  baseColor={themeContext.color.invoiceItem.bg}
                  highlightColor="#dbd2fe"
                  inline={true}
                  count={1}
                  height={120}
                  width={120}
                  style={{
                    display: "grid",
                    width: "100%",
                    paddingBottom: 0,
                    marginBottom: 0,
                  }}
                />
              )}
              <span>Detajet e faturës</span>
            </QrCodeSection>
          </div>
          {invoice?.qr_code_payment_details && (
            <div className="col col-12">
              <QrCodeSection>
                {mounted ? (
                  <QrCode size={120} value={invoice?.qr_code_payment_details} />
                ) : (
                  <Skeleton
                    baseColor={themeContext.color.invoiceItem.bg}
                    highlightColor="#dbd2fe"
                    inline={true}
                    count={1}
                    height={120}
                    width={120}
                    style={{
                      display: "grid",
                      width: "100%",
                      paddingBottom: 0,
                      marginBottom: 0,
                    }}
                  />
                )}
                <span>Detajet e pagesës</span>
              </QrCodeSection>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default React.forwardRef(Invoice);
