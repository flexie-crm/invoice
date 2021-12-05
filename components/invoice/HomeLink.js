import Link from "next/link";
import styled from "styled-components";

import { fontStylesA } from "../shared/Typography";

const Wrapper = styled.a`
  dispay: flex;
  align-items: center;
  margin-bottom: 2rem;
  text-decoration: none;
  cursor: pointer;
  :hover span {
    color: ${(props) => props.theme.color.text.linkHover};
  }
  :focus-visible {
    outline: 2px dotted #7c5dfa;
  }
  svg {
    margin-right: 1.5rem;
  }
  span {
    ${fontStylesA}
    color: ${(props) => props.theme.color.text.link};
  }
`;

export default function HomeLink({ className }) {
  return (
    <Link href="/" passHref={true} scroll={false}>
      <Wrapper className={className}>
        <svg width="7" height="10">
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#9277FF"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <span>Shko mbrapa</span>
      </Wrapper>
    </Link>
  );
}
