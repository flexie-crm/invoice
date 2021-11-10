import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 70rem;
  height: 100%;
  margin: 0 auto;
`;

export default function Wrapper({ children }) {
  return <StyledWrapper>{children}</StyledWrapper>;
}
