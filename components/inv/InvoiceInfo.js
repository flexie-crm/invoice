import React, { useEffect, useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { Heading3 } from "@shared/Headings";
import { fontStylesB } from "@shared/Typography";
import QrCode from "@components/invoice/QrCode";
import { useSession } from "next-auth/react";

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
    text-align: right;
  }

  @media only screen and (max-width: 624px) {
    td {
      text-align: left;
    }
  }
`;

const SellerContainer = styled(InvoiceInfoContainer)`
  td {
    text-align: left;
  }
`;

const Subheading = styled(Heading3)`
  text-decoration: none;
  text-align: right;

  && {
    font-size: 0.9375rem;
  }
`;

const ClientName = styled.td`
  font-size: 1.5em;
`;

const QrCodeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    ${fontStylesB}
  }

  @media only screen and (max-width: 624px) {
    align-items: flex-start;
  }
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
        <div className="col col-6 col-md col-sm">
          <InvoiceInfoContainer>
            <tbody>
              <tr>
                <td className="invoice-metadata">
                  Numër fature <strong>{invoiceNumber}</strong>
                </td>
              </tr>
              <tr>
                <td className="invoice-metadata">
                  Data Faturës <strong>{invoiceDate}</strong>
                </td>
              </tr>
              {dueDate && (
                <tr>
                  <td className="invoice-metadata">
                    Afati Pagesës <strong>{dueDate}</strong>
                  </td>
                </tr>
              )}
              <tr>
                <td>
                  <p className="pt-5" style={{ fontSize: "0.65rem" }}>
                    <strong>NIVF</strong> {nivf}
                  </p>
                  <p style={{ fontSize: "0.65rem" }}>
                    <strong>NSLF</strong> {nslf}
                  </p>
                </td>
              </tr>
            </tbody>
          </InvoiceInfoContainer>
        </div>
        <div className="col col-6 col-md col-sm mb-30">
          <QrCodeSection>
            {mounted ? (
              <QrCode size={115} value={qrCode} />
            ) : (
              <Skeleton
                baseColor={themeContext.color.invoiceItem.bg}
                highlightColor="#dbd2fe"
                inline={true}
                count={1}
                height={115}
                width={115}
                style={{
                  display: "grid",
                  width: "100%",
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              />
            )}
          </QrCodeSection>
        </div>
      </div>
      <div className="grid">
        <div className="col col-6 col-md col-sm">
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
        </div>
        <div className="col col-6 col-md col-sm">
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
        </div>
      </div>
    </>
  );
};

export default InvoiceInfo;
