import styled from "styled-components";

const LoaderContainer = styled.div`
  opacity: 0.3;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #6c6c6c;
  z-index: 10;
`;

export default function Loader({ children }) {
  return <LoaderContainer>{children}</LoaderContainer>;
}
