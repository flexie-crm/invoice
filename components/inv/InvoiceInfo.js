import React, { useEffect, useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { Heading3 } from "@shared/Headings";
import { fontStylesB } from "@shared/Typography";
import QrCode from "@components/inv/QrCode";
import { useSession } from "next-auth/react";
import InvoiceTable from "./InvoiceTable";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InvoiceInfoContainer = styled.table`
  td {
    padding: 2px 0;
    ${fontStylesB}
    font-size: 0.8rem;
    vertical-align: top;
  }

  .invoice-metadata {
    text-align: left;
  }
`;

const BuyerContainer = styled(InvoiceInfoContainer)`
  td {
    text-align: left;
  }

  @media only screen and (max-width: 624px) {
    td {
      text-align: left;
    }
  }
`;

const SellerContainer = styled(InvoiceInfoContainer)`
  td {
    text-align: right;
    padding-right: 20px;
  }

  @media only screen and (max-width: 624px) {
    td {
      text-align: left;
      padding-right: 0;
    }
  }
`;

const Subheading = styled(Heading3)`
  text-decoration: none;
  text-align: right;

  && {
    font-size: 0.9375rem;
  }
`;

const QrCodeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    ${fontStylesB}
    margin-top: 4px;
    letter-spacing: 0.09rem;
  }

  @media only screen and (max-width: 624px) {
    align-items: flex-start;
  }
`;

const InvoiceHeaderBlock = styled.p`
  padding-bottom: 4px;
  color: #4f546b;

  span {
    font-size: 65%;
    margin-top: 6px;
    display: block;
  }
`;

const InfoHeading = styled.th`
  text-align: left;
  vertical-align: top;
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
  padding-left: 10px !important;
`;

const InvoiceInfo = ({
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
}) => {
  const { data: session } = useSession();
  const themeContext = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="grid">
        <div className="col col-12">
          <InvoiceHeaderBlock>
            Faturë Tatimore
            <br />
            <span>
              Data faturës <strong>{invoiceDate}</strong>
            </span>
            <span>
              Numër fature <strong>{invoiceNumber}</strong>
            </span>
          </InvoiceHeaderBlock>
        </div>
      </div>
      <InvoiceTable
        style={{ marginTop: "0px" }}
        headings={
          <>
            <InfoHeading colSpan="2">SHITËSI</InfoHeading>
          </>
        }
      >
        <tr>
          <InfoLabel>Emri Tregtar</InfoLabel>
          <InfoValue>{session?.user?.company}</InfoValue>
        </tr>
        <tr>
          <InfoLabel>NIPT</InfoLabel>
          <InfoValue>{session?.user?.nipt}</InfoValue>
        </tr>
        <tr>
          <InfoLabel>Adresa</InfoLabel>
          <InfoValue>{session?.user?.address}</InfoValue>
        </tr>
        <tr>
          <InfoLabel>Qyteti</InfoLabel>
          <InfoValue>{session?.user?.city}, ALB</InfoValue>
        </tr>
      </InvoiceTable>

      {companyName && nuis && (
        <InvoiceTable
          style={{ marginTop: "0px" }}
          headings={
            <>
              <InfoHeading colSpan="2">BLERËSI / KLIENTI</InfoHeading>
            </>
          }
        >
          <tr>
            <InfoLabel>Emri Tregtar</InfoLabel>
            <InfoValue dangerouslySetInnerHTML={{ __html: companyName }} />
          </tr>
          <tr>
            <InfoLabel>NIPT</InfoLabel>
            <InfoValue>{nuis}</InfoValue>
          </tr>
          <tr>
            <InfoLabel>Adresa</InfoLabel>
            <InfoValue dangerouslySetInnerHTML={{ __html: address }} />
          </tr>
          <tr>
            <InfoLabel>Qyteti</InfoLabel>
            <InfoValue>{cityCountry}</InfoValue>
          </tr>
        </InvoiceTable>
      )}

      {/* <div className="grid"> */}
      {/* <div className="col col-12">
          
        </div> */}

      {/* <div
          className="col col-3 col-md col-sm mb-20"
          style={{ minWidth: "160px" }}
        >
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
            <span>Detajet e fatures</span>
          </QrCodeSection>
        </div> */}
      {/* <div className="col col-6 col-md col-sm">
          <SellerContainer>
            <tbody>
              <tr>
                <td>SHITËSI</td>
              </tr>
              <tr>
                <Subheading as="td">{session?.user?.company}</Subheading>
              </tr>
              <tr>
                <td>
                  <strong>NIPT</strong> {session?.user?.nipt}
                </td>
              </tr>
              <tr>
                <td>{session?.user?.address}</td>
              </tr>
              <tr>
                <td>{session?.user?.city}, ALB</td>
              </tr>
            </tbody>
          </SellerContainer>
        </div> */}
      {/* <div className="col col-6 col-md col-sm">
          <BuyerContainer>
            <tbody>
              <tr>
                <td>BLERËSI / KLIENTI</td>
              </tr>
              <tr>
                <Subheading
                  as="td"
                  dangerouslySetInnerHTML={{ __html: companyName }}
                ></Subheading>
              </tr>
              <tr>
                <td>
                  <strong>NIPT</strong> {nuis}
                </td>
              </tr>
              <tr>
                <td dangerouslySetInnerHTML={{ __html: address }}></td>
              </tr>
              <tr>
                <td>{cityCountry}</td>
              </tr>
            </tbody>
          </BuyerContainer>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default InvoiceInfo;
