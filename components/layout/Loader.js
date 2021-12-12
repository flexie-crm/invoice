import styled, { keyframes } from "styled-components";

const LoaderContainer = styled.div`
  position: absolute;
  z-index: 9;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  &:after {
    content: "";
    opacity: 0.85;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #373b53;
    z-index: 10;
  }
`;

const loaderAnimation = keyframes`
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 290px;
    height: 30px;
    width: 15px;
  }
`;

const LoaderMessage = styled.div`
  z-index: 11;
  width: 300px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  letter-spacing: 0.15em;

  &:before,
  &:after {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background: #fff;
    position: absolute;
    animation: ${loaderAnimation} 0.7s infinite alternate ease-in-out;
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }
`;

export default function Loader({ children }) {
  return (
    <LoaderContainer>
      {children ? children : <LoaderMessage>Duke fiskalizuar...</LoaderMessage>}
    </LoaderContainer>
  );
}
