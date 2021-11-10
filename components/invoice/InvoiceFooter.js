import styled from "styled-components";

import Button from "@shared/Buttons";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem;
  background: ${(props) => props.theme.color.invoiceItem.bg};

  @media only screen and (min-width: 650px) {
    display: none;
  }
`;

export default function InvoiceFooter({
  status,
  setPopupIsOpen,
  setFormIsOpen,
  handlePaid,
}) {
  return (
    <Wrapper>
      <Button secondary onClick={() => setFormIsOpen(true)}>
        Edit
      </Button>
      <Button alert onClick={() => setPopupIsOpen(true)}>
        Delete
      </Button>
      {status !== "paid" ? (
        <Button onClick={handlePaid}>Mark As Paid</Button>
      ) : null}
    </Wrapper>
  );
}
