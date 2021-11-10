import { useState, useEffect } from "react";
import Store from "store";
import styled, { ThemeProvider } from "styled-components";
import { light, dark } from "../../data/Themes";

import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Sidebar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  @media only screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

const CopyRightNoticeWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding-top: 1rem;
`;

const CopyRightNotice = styled.p`
  color: #4f546b;
  font-size: 0.7rem;
  line-height: 1.125;
`;

export default function Layout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (Store.get("theme") === undefined) {
      Store.set("theme", "light");
    }
    setTheme(Store.get("theme"));
  }, [setTheme]);

  function toggleTheme() {
    Store.set("theme", theme === "light" ? "dark" : "light");
    setTheme(Store.get("theme"));
  }

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <Wrapper>
        <Sidebar toggleTheme={toggleTheme} />
        {children}
        <CopyRightNoticeWrapper>
          <CopyRightNotice>
            Mundesuar nga{" "}
            <a target="_blank" href="https://flexie.io">
              Flexie CRM
            </a>{" "}
            dhe{" "}
            <a target="_blank" href="https://ivaelektronik.com">
              IVA Elektronik
            </a>
          </CopyRightNotice>
        </CopyRightNoticeWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}
