import styled, { css, keyframes } from "styled-components";
import useLoader from "@store/loaders";

const Button = styled.button`
  width: ${(props) => (props.wide ? "100%" : "initial")};
  border: none;
  border-radius: 10rem;
  padding: 1rem 1.5rem;
  background: #7c5dfa;

  color: white;
  font-family: "Spartan", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.25;
  -webkit-font-smoothing: antialiased;

  cursor: pointer;
  transition: background 0.05s, color 0.05s;
  outline: none;

  :hover {
    background: #9277ff;
  }

  :focus-visible {
    outline: 2px dotted #7e88c3;
  }

  :disabled {
    opacity: 0.8;
  }

  ${(props) =>
    props.secondary &&
    css`
      background: ${props.theme.color.btn.secondary.bg};
      color: ${props.theme.color.btn.secondary.text};

      :hover {
        background: ${props.theme.color.btn.secondary.hover};
        color: ${props.theme.color.btn.secondary.hoverText};
      }
    `}

  ${(props) =>
    props.tertiary &&
    css`
      background: ${props.theme.color.btn.tertiary.bg};
      color: ${props.theme.color.btn.tertiary.text};

      :hover {
        background: ${props.theme.color.btn.tertiary.hover};
      }
    `}

    ${(props) =>
    props.alert &&
    css`
      background: #ec5757;

      :hover {
        background: #ff9797;
      }
    `}

    ${(props) =>
    props.quaternary &&
    css`
      background: ${props.theme.color.btn.quaternary.bg};
      color: ${props.theme.color.btn.quaternary.text};

      :hover {
        background: ${props.theme.color.btn.quaternary.hover};
      }
    `}
`;

export default Button;

const StyledButtonPlus = styled(Button)`
  min-width: 5.875rem;
  padding: 0.5rem;
  padding-right: 1rem;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  margin-right: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 50%;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled.img`
  ${(props) =>
    props.isLoading &&
    css`
      animation: ${rotate} 0.7s linear infinite;
    `}
  width: 0.625rem;
  height: 0.625rem;
`;

export function ButtonPlus({ children, hidePlus, ...rest }) {
  const isFormLoading = useLoader((state) => state.isFormLoading);

  return (
    <StyledButtonPlus {...rest}>
      {!hidePlus && (
        <IconWrapper>
          <Icon isLoading={isFormLoading} src="/images/icon-plus.svg" alt="" />
        </IconWrapper>
      )}
      {children}
    </StyledButtonPlus>
  );
}

const StyledDeleteButton = styled.button`
  align-self: end;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.7rem;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;

  :disabled svg {
    fill: #dddddd;
  }

  svg {
    fill: #ea7d7d;
    transition: fill 0.05s;
  }

  :hover:enabled {
    svg {
      fill: #ec5757;
    }
  }
`;

export function DeleteButton({ children, ...rest }) {
  return (
    <StyledDeleteButton type="button" aria-label="delete item" {...rest}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.5 15c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-5v-1h5v1zm-2-16h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-7 15.5c0-1.267.37-2.447 1-3.448v-6.052c0-.552.447-1 1-1s1 .448 1 1v4.032c.879-.565 1.901-.922 3-1.006v-7.026h-18v18h13.82c-1.124-1.169-1.82-2.753-1.82-4.5zm-7 .5c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm5 0c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10z" />
      </svg>
      {children}
    </StyledDeleteButton>
  );
}
