import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 75.85rem;
  height: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 3.5rem 1.5rem;

  .invoice-page-header {
    margin-bottom: 1rem;
  }

  @media only screen and (min-width: 768px) {
    padding: 3.5rem 3rem;

    .invoice-page-header {
      margin-bottom: 1.5rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    padding: 4.5rem 3rem;
  }
`;

export default function Wrapper({ children }) {
  return <StyledWrapper>{children}</StyledWrapper>;
}
