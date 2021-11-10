import styled from "styled-components";

import { Heading2 } from "../shared/Headings";

const Heading = styled(Heading2)`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

export const CreateInvoiceFormHeading = styled(Heading)``;

export const EditInvoiceFormHeading = styled(Heading)`
  span {
    color: #4f546b;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  padding 1rem 1.5rem 1rem 0rem;
  align-self: end;
  
  > button {
    padding: 1rem;
  }

  @media only screen and (min-width: 800px) {
    padding: 1.5rem;
    > button {
      padding: 1rem 1.5rem;
    }
  }
`;

export const CreateInvoiceFormButtons = styled(Buttons)`
  > *:first-child {
    margin-right: auto;
  }
`;

export const EditInvoiceFormButtons = styled(Buttons)`
  justify-content: flex-end;
`;
