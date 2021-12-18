import React, { useEffect, useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { isMobile as detectMobile } from "react-device-detect";

import { fontStylesB } from "@shared/Typography";

import QrCode from "@components/invoice/QrCode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import localState from "@libs/localState";
import { useSession } from "next-auth/react";
import InvoiceTable from "./InvoiceTable";

import dayjs from "dayjs";
import "dayjs/locale/sq";

const QrCodeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    ${fontStylesB}
    margin-top: 4px;
    letter-spacing: 0.09rem;
  }

  @media only screen and (max-width: 624px) {
    align-items: flex-end;
  }
`;

const InfoHeading = styled.th`
  text-align: left;
  vertical-align: top;
  padding: 0 !important;

  span {
    padding: 7px 7px 4px 7px;
    color: #fff;
    background: #4f546b;
  }
`;

const InfoBranding = styled.th`
  text-align: right;
  font-size: 80%;
  text-transform: none !important;
  padding: 0 !important;
  font-weight: normal;
  min-width: 50%;

  span {
    display: none;
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

const InvoiceInfo = ({
  invoice,
  invoiceNumber,
  invoiceDate,
  qrCode,
  nuis,
  companyName,
  address,
  cityCountry,
  dueDate,
  nivf,
  nslf,
  printing,
}) => {
  dayjs.locale("sq");

  const { data: session } = useSession();
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

  return (
    <>
      <InvoiceTable
        style={{ marginTop: "0px" }}
        headings={
          <>
            <InfoHeading>
              <span>Faturë Tatimore</span>
            </InfoHeading>
            <InfoBranding colSpan="2" className="print-branding">
              <span>Gjeneruar nga Flexie CRM</span>
            </InfoBranding>
          </>
        }
      >
        <tr>
          {!isMobile && <InfoLabel>Data e faturës:</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Data e faturës</b>
              </p>
            )}
            {invoiceDate}
          </InfoValue>
          {!isMobile && (
            <td rowSpan="7" valign="top">
              <QrCodeSection>
                {mounted ? (
                  <QrCode size={120} value={qrCode} />
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
            </td>
          )}
        </tr>
        <tr>
          {!isMobile && <InfoLabel>Numri i faturës:</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Numri i faturës</b>
              </p>
            )}
            {invoiceNumber}
          </InfoValue>
        </tr>
        <tr>
          {!isMobile && <InfoLabel>Monedha e faturës:</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Monedha e faturës</b>
              </p>
            )}
            {invoice.currency}
            {invoice.currency != "ALL" &&
              ` - kursi i këmbimit ${invoice.currency_rate}`}
          </InfoValue>
        </tr>
        <tr>
          {!isMobile && <InfoLabel>Njësia e biznesit</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Njësia e biznesit</b>
              </p>
            )}
            {invoice.payload?.business_unit}
          </InfoValue>
        </tr>
        <tr>
          {!isMobile && <InfoLabel>Kodi i operatorit</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Kodi i operatorit</b>
              </p>
            )}
            {invoice.payload?.operator_code}
          </InfoValue>
        </tr>
        {invoice.payload?.tcr_code && (
          <tr>
            {!isMobile && <InfoLabel>Kodi i arkës</InfoLabel>}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>Kodi i arkës</b>
                </p>
              )}
              {invoice.payload?.tcr_code}
            </InfoValue>
          </tr>
        )}
        {invoice.payload?.period_start && (
          <tr>
            {!isMobile && (
              <InfoLabel>Fillimi i periudhës së faturimit</InfoLabel>
            )}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>Fillimi i periudhës së faturimit</b>
                </p>
              )}
              {dayjs(invoice.payload?.period_start).format("DD MMMM, YYYY")}
            </InfoValue>
          </tr>
        )}
        {invoice.payload?.period_end && (
          <tr>
            {!isMobile && (
              <InfoLabel>Mbarimi i periudhës së faturimit</InfoLabel>
            )}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>Mbarimi i periudhës së faturimit</b>
                </p>
              )}
              {dayjs(invoice.payload?.period_end).format("DD MMMM, YYYY")}
            </InfoValue>
          </tr>
        )}
        <tr>
          {!isMobile && <InfoLabel>NSLF</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>NSLF</b>
              </p>
            )}
            {nslf}
          </InfoValue>
        </tr>
        <tr>
          {!isMobile && <InfoLabel>NIVF</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>NIVF</b>
              </p>
            )}
            {nivf}
          </InfoValue>
        </tr>
      </InvoiceTable>

      <InvoiceTable
        style={{ marginTop: "0px" }}
        headings={
          <>
            <InfoHeading colSpan="2">
              <span>SHITËSI</span>
            </InfoHeading>
          </>
        }
      >
        <tr>
          {!isMobile && <InfoLabel>Emri Tregtar</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Emri Tregtar</b>
              </p>
            )}
            {session?.user?.company}
          </InfoValue>
        </tr>
        <tr>
          {!isMobile && <InfoLabel>NIPT</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>NIPT</b>
              </p>
            )}
            {session?.user?.nipt}
          </InfoValue>
        </tr>
        <tr>
          {!isMobile && <InfoLabel>Adresa</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Adresa</b>
              </p>
            )}
            {session?.user?.address}
          </InfoValue>
        </tr>
        <tr>
          {!isMobile && <InfoLabel>Qyteti</InfoLabel>}
          <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
            {isMobile && (
              <p>
                <b>Qyteti</b>
              </p>
            )}
            {session?.user?.city}, ALB
          </InfoValue>
        </tr>
      </InvoiceTable>

      {companyName && nuis && (
        <InvoiceTable
          style={{ marginTop: "0px" }}
          headings={
            <>
              <InfoHeading colSpan="2">
                <span>BLERËSI / KLIENTI</span>
              </InfoHeading>
            </>
          }
        >
          <tr>
            {!isMobile && <InfoLabel>Emri Tregtar</InfoLabel>}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>Emri Tregtar</b>
                </p>
              )}
              <span dangerouslySetInnerHTML={{ __html: companyName }} />
            </InfoValue>
          </tr>
          <tr>
            {!isMobile && <InfoLabel>NIPT</InfoLabel>}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>NIPT</b>
                </p>
              )}
              {nuis}
            </InfoValue>
          </tr>
          <tr>
            {!isMobile && <InfoLabel>Adresa</InfoLabel>}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>Adresa</b>
                </p>
              )}
              <span dangerouslySetInnerHTML={{ __html: address }} />
            </InfoValue>
          </tr>
          <tr>
            {!isMobile && <InfoLabel>Qyteti</InfoLabel>}
            <InfoValue isMobile={isMobile} {...(isMobile && { colSpan: 2 })}>
              {isMobile && (
                <p>
                  <b>Qyteti</b>
                </p>
              )}
              {cityCountry}
            </InfoValue>
          </tr>
        </InvoiceTable>
      )}
    </>
  );
};

export default InvoiceInfo;
