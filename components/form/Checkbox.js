import React from "react";
import styled, { css } from "styled-components";
import { fontStylesA } from "../shared/Typography";

const Wrapper = styled.div`
  ${fontStylesA}
  line-height: 1.225;

  --background: ${(props) => props.theme.color.form.fieldBg};
  --border: ${(props) => props.theme.color.form.fieldBorder};
  --border-hover: #bbc1e1;
  --border-active: #0099e5;
  --tick: #fff;
  position: relative;

  :focus-within label {
    color: ${(props) => props.theme.color.text.formLabel};
  }

  input,
  svg {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    display: inline-block;
  }

  input[type="radio"] {
    border-radius: 50% !important;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    margin-top: 3px;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    outline: none;
    background: var(--background);
    border: none;
    margin: 0 8px 0 0;
    padding: 0;
    cursor: pointer;
    border-radius: 2px;
    transition: box-shadow 0.3s;
    box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));
  }

  input:hover {
    --s: 3px;
    --b: var(--border-hover);
  }

  input:checked {
    --b: var(--border-active);
  }

  svg {
    pointer-events: none;
    fill: none;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: var(--stroke, var(--border-active));
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 16px;
    transform: scale(var(--scale, 1)) translateZ(0);
  }

  .path input:checked {
    --s: 2px;
    transition-delay: 0.4s;
  }

  .path input:checked + svg {
    --a: 16.1 86.12;
    --o: 102.22;
  }

  .path svg {
    stroke-dasharray: var(--a, 86.12);
    stroke-dashoffset: var(--o, 86.12);
    transition: stroke-dasharray 0.6s, stroke-dashoffset 0.6s;
  }

  .check-bounce {
    --stroke: var(--tick);
  }

  .check-bounce input:checked {
    --s: 11px;
  }

  .check-bounce input:checked + svg {
    -webkit-animation: check-bounce 0.4s linear forwards 0.2s;
    animation: check-bounce 0.4s linear forwards 0.2s;
  }

  .check-bounce svg {
    --scale: 0;
  }

  @-webkit-keyframes check-bounce {
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes check-bounce {
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  ${(props) =>
    props.hideLabels &&
    css`
      @media only screen and (min-width: 600px) {
        & > *:nth-child(1) {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }
      }
    `}
`;

const Label = styled.label`
  color: ${(props) =>
    props.valid ? props.theme.color.text.formLabel : "#EC5757"};
  transition: color 0.05s;
`;

const Field = styled.input``;

const Checkbox = ({ theme, type, label, name, hideLabels, ...rest }) => {
  let checboxSvg;

  if (type === "checkbox") {
    checboxSvg = <polyline points="4 10.74 7.5 14.25 14 7"></polyline>;
  } else {
    checboxSvg = (
      <rect width="5" height="5" rx="30" x="6.5" y="7.7" fill="#FFFFFF"></rect>
    );
  }

  return (
    <Wrapper hideLabels={hideLabels}>
      <Label className={theme || "check-bounce"} htmlFor={name} valid={true}>
        <Field type={type || "checkbox"} name={name} valid={true} {...rest} />
        <svg viewBox="0 0 18 18">{checboxSvg}</svg>
        <span>{label}</span>
      </Label>
    </Wrapper>
  );
};

export default React.memo(Checkbox);
