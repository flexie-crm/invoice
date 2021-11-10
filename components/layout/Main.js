import styled from "styled-components";

const Wrapper = styled.main`
  flex: 1;
  display: flex;
  width: 100%;

  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-border-radius: 2px;
  }
  ::-webkit-scrollbar:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-thumb:vertical {
    background: rgba(0, 0, 0, 0.4);
    -webkit-border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:vertical:active {
    background: rgba(0, 0, 0, 0.5);
    -webkit-border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:horizontal {
    background: rgba(0, 0, 0, 0.4);
    -webkit-border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:horizontal:active {
    background: rgba(0, 0, 0, 0.5);
    -webkit-border-radius: 2px;
  }
`;

export default function Main({ className, children }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}
