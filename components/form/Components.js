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
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
  z-index: 20;
  background: ${(props) => props.theme.color.form.bg};
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
  
  > button {
    padding: 1rem;
  }

  @media only screen and (min-width: 800px) {
    > button {
      padding: 1rem 1.5rem;
    }
  }
`;

export const CreateInvoiceFormButtons = styled(Buttons)``;

export const EditInvoiceFormButtons = styled(Buttons)`
  justify-content: flex-end;
`;
