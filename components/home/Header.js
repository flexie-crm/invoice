import styled from "styled-components";
import useTotals from "@store/totals";
import shallow from "zustand/shallow";

import Dropdown from "@home/Dropdown";
import { Heading1 } from "@shared/Headings";
import { fontStylesA } from "@shared/Typography";
import { ButtonPlus } from "@shared/Buttons";
import { invoicesMessage } from "@utilities/Misc";

import useLoader from "@store/loaders";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 4rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const Heading = styled(Heading1)`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;

  @media only screen and (min-width: 550px) {
    font-size: 2rem;
  }
`;

const Subheading = styled.div`
  ${fontStylesA}
`;

const Button = styled(ButtonPlus)`
  margin-left: 1rem;

  .btn-plus-invoice {
    display: none;
  }

  @media only screen and (min-width: 550px) {
    margin-left: 2.5rem;

    .btn-plus-invoice {
      display: initial;
    }
  }
`;

export default function Header({ invoices, filter, setFilter, setFormIsOpen }) {
  const invoiceTotalCount = useTotals((state) => state.invoiceTotalCount);

  const message = invoicesMessage(invoiceTotalCount, filter);
  const setIsFormLoading = useLoader((state) => state.setIsFormLoading);

  return (
    <Wrapper>
      <TextWrapper>
        <Heading>Faturat</Heading>
        <Subheading>{message}</Subheading>
      </TextWrapper>
      <Dropdown setFilter={setFilter} />
      <Button
        onClick={() => {
          setIsFormLoading(true);
          setFormIsOpen(true);
        }}
      >
        Shto <span className="btn-plus-invoice">Fature</span>
      </Button>
    </Wrapper>
  );
}
