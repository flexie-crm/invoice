import { useState } from "react";
import styled from "styled-components";
import useLoader from "@store/loaders";

import InvoiceStatus from "@shared/InvoiceStatus";
import { ButtonPlus } from "@shared/Buttons";
import { fontStylesA } from "@shared/Typography";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 1rem;
  background: ${(props) => props.theme.color.invoiceItem.bg};
`;

const Status = styled.span`
  ${fontStylesA}
  margin-right: auto;
  display: none;

  @media only screen and (min-width: 650px) {
    margin-right: 1rem;
    display: inherit;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

const Button = styled(ButtonPlus)`
  padding: 0.7rem;
  padding-right: 0.5rem !important;

  @media only screen and (min-width: 550px) {
    .btn-plus-invoice {
      display: initial;
    }
  }
`;

export default function InvoiceHeader({
  className,
  status,
  type,
  printHandler,
  setCorrectiveIsOpen,
}) {
  const setIsFormLoading = useLoader((state) => state.setIsFormLoading);
  const isFormLoading = useLoader((state) => state.isFormLoading);
  const [isPrintLoading, setIsPrintLoading] = useState(false);

  return (
    <Wrapper className={className}>
      <Status>Status</Status>
      <InvoiceStatus status={status} />
      <Buttons>
        {type != "CORRECTIVE" && <Button
          hidePlus
          alert
          onClick={() => {
            setIsFormLoading(true);
            setCorrectiveIsOpen(true);
          }}
        >
          {isFormLoading ? "Anullo..." : "Anullo"}
        </Button>}
        <Button
          hidePlus
          onClick={() => {
            setIsPrintLoading(true);
            printHandler();
            setTimeout(() => setIsPrintLoading(false), 800);
          }}
        >
          {isPrintLoading ? "Printo..." : "Printo"}
        </Button>
      </Buttons>
    </Wrapper>
  );
}
