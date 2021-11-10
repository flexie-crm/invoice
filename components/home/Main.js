import styled from "styled-components";

import LayoutMain from "../layout/Main";

const Main = styled(LayoutMain)`
  position: relative;
  padding: 2rem 1.5rem 2.8rem;

  @media only screen and (min-width: 768px) {
    padding: 3.5rem 3rem 2.8rem;
  }

  @media only screen and (min-width: 1024px) {
    padding: 4.5rem 3rem 2.8rem;
  }
`;

export default Main;
