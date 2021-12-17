import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import { useSession, signOut } from "next-auth/react";

import { Logo, Logout, Settings } from "@shared/Logo";
import ThemeToggle from "./ThemeToggle";

const Wrapper = styled.aside`
  position: sticky;
  top: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.color.sidebar.bg};
  transition: background 0.05s;

  .sidebar-logo {
    margin-right: auto;
  }

  .sidebar-toggle-btn {
    margin: 0 1.75rem;
  }

  .sidebar-avatar {
    margin: 0 2rem;
  }

  @media only screen and (min-width: 900px) {
    flex-direction: column;
    width: initial;
    height: 100vh;

    .sidebar-logo {
      margin-right: initial;
      margin-bottom: auto;
    }

    .sidebar-toggle-btn {
      margin: 1.75rem 0;
    }

    .sidebar-avatar {
      margin: 1.5rem 0;
    }
  }
`;

const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background: #494e6e;

  @media only screen and (min-width: 900px) {
    width: 100%;
    height: 1px;
  }
`;

export default function Sidebar({ toggleTheme }) {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <Logo className="sidebar-logo" />
      <Settings />
      <Divider />
      <Logout
        onClick={async () => {
          if (session) {
            await signOut({
              redirect: false,
            });

            Router.push("/login");
          }
        }}
      />
      <Divider />
      <ThemeToggle className="sidebar-toggle-btn" toggleTheme={toggleTheme} />
    </Wrapper>
  );
}
