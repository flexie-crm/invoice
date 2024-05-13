import { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { isMobile as detectMobile } from "react-device-detect";

import localState from "@libs/localState";
import { fontStylesB } from "@shared/Typography";
import InvoiceTable from "./InvoiceTable";
import QrCode from "@components/invoice/QrCode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InfoHeading = styled.th`
  text-align: left;
  vertical-align: top;
  padding-top: 10px !important;
  padding-bottom: 0 !important;

  span {
    padding: 7px 7px 4px 7px;
    color: #fff;
    background: #4f546b;
  }

  @media print {
    span {
      background: #000;
    }
  }
`;

const InfoLabel = styled.td`
  text-align: right;
  vertical-align: top;
  padding-right: 10px !important;
  width: 35%;
  font-weight: bold;
`;

const InfoValue = styled.td`
  text-align: left;
  vertical-align: top;
  padding-left: ${(props) => (props.isMobile ? "0" : "10px")} !important;
`;

const QrCodeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    ${fontStylesB}
    margin-top: 4px;
  }
`;

const PaymentDetails = ({ invoice, payload, dueDate, printing }) => {
  const themeContext = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  const [printingMode] = localState("@printingMode", "A4");
  const [isMobile, setIsMobile] = useState(detectMobile);

  useEffect(() => {
    setMounted(true);

    if (printing && printingMode === "thermal") {
      setIsMobile(true);
    }
  }, []);

  let bank = {};
  try {
    bank = JSON.parse(payload.bank);
  } catch (e) {}

  return (
    <>
      <InvoiceTable
        className="break-here"
        style={{ marginTop: "0px", marginBottom: "0" }}
        headings={
          <>
            <InfoHeading colSpan="3">
              <span>DETAJET E PEGESËS</span>
            </InfoHeading>
          </>
        }
      >
        <tr>
          {!isMobile && <InfoLabel>Afati i pagesës</InfoLabel>}
          <InfoValue
            isMobile={isMobile}
            isMobile={isMobile}
            {...(isMobile && { colSpan: 2 })}
          >
            {isMobile && (
              <p>
                <b>Afati i pagesës</b>
              </p>
            )}
            {dueDate}
          </InfoValue>

          {!isMobile && (
            <td rowSpan="6" valign="top" style={{ textAlign: "right" }}>
              <QrCodeSection>
                {mounted ? (
                  <QrCode
                    size={120}
                    value={invoice?.qr_code_payment_details || "UNKNOWN"}
                  />
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
            </td>
          )}
        </tr>

        {bank?.bank && (
          <tr>
            {!isMobile && <InfoLabel>Emri i bankës</InfoLabel>}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>Emri i bankës</b>
                </p>
              )}
              {bank?.bank}
            </InfoValue>
          </tr>
        )}

        {bank?.iban && (
          <tr>
            {!isMobile && <InfoLabel>IBAN</InfoLabel>}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>IBAN</b>
                </p>
              )}
              {bank?.iban}
            </InfoValue>
          </tr>
        )}

        {bank?.swift && (
          <tr>
            {!isMobile && <InfoLabel>SWIFT</InfoLabel>}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>SWIFT</b>
                </p>
              )}
              {bank?.swift}
            </InfoValue>
          </tr>
        )}

        <tr>
          {!isMobile && <InfoLabel>Monedha</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Monedha</b>
              </p>
            )}
            {payload.currency}
          </InfoValue>
        </tr>
        <tr>
          <td style={{ height: "25px" }}></td>
        </tr>
      </InvoiceTable>
    </>
  );
};

export default PaymentDetails;
