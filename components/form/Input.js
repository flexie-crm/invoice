import React from "react";
import styled, { css } from "styled-components";
import { fontStylesA } from "@shared/Typography";
import { SharedInput } from "@shared/SharedStyle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${fontStylesA}

  :focus-within label {
    color: ${(props) =>
      props.valid ? props.theme.color.text.formLabel : "#EC5757"};
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
  margin-bottom: 2px;
`;

const Field = styled.input`
  ${SharedInput}
`;

const Input = React.forwardRef((props, ref) => {
  const { wrapperClassName, label, name, hideLabels, valid, errorMessage } =
    props;

  return (
    <Wrapper hideLabels={hideLabels} className={wrapperClassName} valid={valid}>
      <Label htmlFor={name} valid={valid}>
        {label} {!valid && errorMessage}
      </Label>
      <Field ref={ref} valid={valid} name={name} {...props} />
    </Wrapper>
  );
});

export default React.memo(Input);
