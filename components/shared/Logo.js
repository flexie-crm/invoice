import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
`;

const Image = styled("img")`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 30px;
  cursor: pointer;
`;

const ImageLogout = styled("img")`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 23px;
  cursor: pointer;
`;

const ImageSettings = styled("img")`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 27px;
  cursor: pointer;
`;

export function Logo({ className }) {
  return (
    <Wrapper className={className}>
      <Link href="/" passHref={true} scroll={false}>
        <Image src="/images/logo.svg" alt="logo" />
      </Link>
    </Wrapper>
  );
}

export function Logout({ className, ...other }) {
  return (
    <Wrapper className={className} {...other}>
      <ImageLogout src="/images/logout.svg" alt="logout" />
    </Wrapper>
  );
}

export function Settings({ className, ...other }) {
  return (
    <Wrapper className={className} {...other}>
      <Link href="/settings" passHref={true} scroll={false}>
        <ImageSettings src="/images/settings.svg" alt="settings" />
      </Link>
    </Wrapper>
  );
}
