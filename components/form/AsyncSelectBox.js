import React from "react";
import styled, { css } from "styled-components";
import AsyncCreatableSelect from "react-select/async-creatable";
import AsyncSelect from "react-select/async";
import { createFilter } from "react-select";

import { fontStylesA } from "../shared/Typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${fontStylesA}

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

const SelectWrapper = styled.div`
  position: relative;
  grid-column: 1 / -1;
`;

const sharedStyleForSelect = css`
  .Select__control {
    height: 37px;
    width: 100%;
    border: 1px solid
      ${(props) =>
        props.valid ? props.theme.color.form.fieldBorder : "#EC5757"};
    border-radius: 4px;
    cursor: pointer;
    background: ${(props) => props.theme.color.form.fieldBg};
  }

  .Select__menu {
    background: ${(props) => props.theme.color.form.fieldBg};
  }

  .Select__option:not(:hover):not(.Select__option--is-selected) {
    color: ${(props) => props.theme.color.text.heading};
  }

  .Select__option.Select__option--is-focused:not(.Select__option--is-selected) {
    color: #222 !important;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__single-value {
    color: ${(props) => props.theme.color.text.heading};
    top: 10px !important; 
  }

  .Select__control:hover {
    border-color: ${(props) => props.theme.color.form.fieldBorder};
  }

  .Select__control--is-focused {
    box-shadow: ${(props) => props.theme.color.text.boxShadow};
    outline: none;
  }

  .Select__menu {
    color: #3c3d3e;
  }

  .Select__input {
    color: ${(props) => props.theme.color.text.heading};
  }
`;

const StyledSelect = styled(AsyncSelect)`
  ${sharedStyleForSelect}
`;

const StyledCreatableSelect = styled(AsyncCreatableSelect)`
  ${sharedStyleForSelect}
`;

const AsyncSelectBox = (props, ref) => {
  const { label, name, hideLabels, valid, errorMessage, options, ...other } =
    props;
  const { isCreatable, wrapperClassName } = other;

  return (
    <Wrapper className={wrapperClassName} hideLabels={hideLabels}>
      <Label htmlFor={name} valid={valid}>
        {label} {!valid && errorMessage}
      </Label>
      <SelectWrapper>
        {isCreatable ? (
          <StyledCreatableSelect
            styles={{
              input: (baseStyles, state) => ({
                ...fontStylesA,
                margin: '0 !important',
              }),
            }}
            ref={ref}
            isClearable
            valid={valid}
            name={name}
            {...other}
            allowCreateWhileLoading={true}
            loadOptions={options}
            classNamePrefix="Select"
            cacheOptions
            defaultOptions
            onChange={(value) => {
              const { onChangeCallback } = other;
              if (onChangeCallback) {
                onChangeCallback(name, value, {});
              }
            }}
            filterOption={createFilter({ ignoreAccents: false })}
            noOptionsMessage={() => "Nuk ka opsione"}
            loadingMessage={() => "Duke ngarkuar..."}
            formatCreateLabel={(inputValue) =>
              `Kliko te krijosh: "${inputValue}"`
            }
          />
        ) : (
          <StyledSelect
            name={name}
            valid={valid}
            {...other}
            loadOptions={options}
            classNamePrefix="Select"
            cacheOptions
            defaultOptions
            onChange={(value) => {
              const { onChangeCallback } = other;
              if (onChangeCallback) {
                onChangeCallback(name, value, {});
              }
            }}
            filterOption={createFilter({ ignoreAccents: false })}
            noOptionsMessage={() => "Nuk ka opsione"}
            loadingMessage={() => "Duke ngarkuar..."}
          />
        )}
      </SelectWrapper>
    </Wrapper>
  );
};

export default React.forwardRef(AsyncSelectBox);
