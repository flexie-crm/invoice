import styled, { css } from "styled-components";

const baseStyles = css`
  color: ${(props) => props.theme.color.text.heading};
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  transition: color 0.05s;
`;

export const Heading1 = styled.h1`
  ${baseStyles}
  font-size: ${(props) => props.size || "1.5rem"};
  line-height: 1.125;
  letter-spacing: -1px;
`;

export const Heading2 = styled.h2`
  ${baseStyles}
  font-size: ${(props) => props.size || "1.25rem"};
  line-height: 1.1;
`;

export const Heading3 = styled.h3`
  ${baseStyles}
  font-size: ${(props) => props.size || "1rem"};
  line-height: 1.5;
  letter-spacing: -0.8px;
`;

export const Heading4 = styled.h4`
  ${baseStyles}
  font-size: ${(props) => props.size || ".75rem"};
  line-height: 1.25;
  letter-spacing: -0.5px;
`;
