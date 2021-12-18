import Head from "next/head";
import { getSession } from "next-auth/react";
import styled, { css } from "styled-components";
import Cookies from "cookies";
import { useCookies } from "react-cookie";
import dynamic from "next/dynamic";

import HomeLink from "@components/invoice/HomeLink";

const BankList = dynamic(() => import("@components/settings/bank/BankList"));

const ChangePassword = dynamic(() =>
  import("@components/settings/password/ChangePassword")
);

const TcrOperations = dynamic(() =>
  import("@components/settings/tcr/TcrOperations")
);

const ChangeConfig = dynamic(() =>
  import("@components/settings/config/ChangeConfig")
);

const SetPrinting = dynamic(() =>
  import("@components/settings/printing/SetPriting")
);

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 75.85rem;
  height: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 3.5rem 1.5rem;

  @media only screen and (min-width: 768px) {
    padding: 3.5rem 3rem 2.8rem;
  }

  @media only screen and (min-width: 1024px) {
    padding: 4.5rem 3rem 2.8rem;
  }
`;

const SettingItemsWrapper = styled.div`
  width: 100%;
  margin: 0;
`;

const SettingItem = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  font-family: "Spartan", sans-serif;
  padding: 0.7rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 10rem;
  color: ${(props) => props.theme.color.text.heading};

  &:hover {
    color: #fff;
    background: #a994ff;
  }

  ${(props) =>
    props.isSelected &&
    css`
      color: #fff;
      background: #7c5dfa;

      &:hover {
        background: #7c5dfa !important;
      }
    `}
`;

export default function Settings({ initialOpenedItem, user }) {
  const [cookies, setCookie] = useCookies(["openedItem"]);
  const handleSettingOpenedItem = (item) => {
    setCookie("openedItem", item, { path: "/" });
  };

  return (
    <>
      <Head>
        <title>Fatura Konfigurime | Flexie CRM</title>
      </Head>
      <SettingsWrapper>
        <HomeLink />
        <SettingItemsWrapper className="grid">
          <div className="col col-md col-sm col-3">
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("konfigurime")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "konfigurime"
              }
            >
              Konfigurime
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("fjalekalimi")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "fjalekalimi"
              }
            >
              Fjalekalimi
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("bankat")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "bankat"
              }
            >
              Bankat
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("arka")}
              isSelected={(cookies?.openedItem || initialOpenedItem) === "arka"}
            >
              Arka
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("printimi")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "printimi"
              }
            >
              Printimi
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("abonimi")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "abonimi"
              }
            >
              Abonimi
            </SettingItem>
          </div>
          <div className="col col-md col-sm col-9">
            <div
              className={`grid ${
                (cookies?.openedItem || initialOpenedItem) !== "konfigurime"
                  ? "hidden"
                  : ""
              }`}
            >
              <ChangeConfig user={user} />
            </div>

            <div
              className={`grid ${
                (cookies?.openedItem || initialOpenedItem) !== "bankat"
                  ? "hidden"
                  : ""
              }`}
            >
              <BankList />
            </div>

            <div
              className={`grid ${
                (cookies?.openedItem || initialOpenedItem) !== "fjalekalimi"
                  ? "hidden"
                  : ""
              }`}
            >
              <ChangePassword />
            </div>

            <div
              className={`grid ${
                (cookies?.openedItem || initialOpenedItem) !== "arka"
                  ? "hidden"
                  : ""
              }`}
            >
              <TcrOperations />
            </div>

            <div
              className={`grid ${
                (cookies?.openedItem || initialOpenedItem) !== "printimi"
                  ? "hidden"
                  : ""
              }`}
            >
              <SetPrinting />
            </div>
          </div>
        </SettingItemsWrapper>
      </SettingsWrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const cookies = new Cookies(context.req, context.res);

  return {
    props: {
      initialOpenedItem: cookies.get("openedItem") || "konfigurime",
      user: session.user,
    },
  };
}
