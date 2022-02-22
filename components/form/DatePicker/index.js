import React, { useState, useEffect } from "react";
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import useValidation from "@store/validations";
import { fontStylesA } from "../../shared/Typography";
import { sq } from "./locale";

registerLocale("sq", sq);
setDefaultLocale("sq");

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  ${fontStylesA}
  position: relative;

  .react-datepicker-wrapper {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  grid-column: 1 / 2;
  color: ${(props) =>
    props.valid ? props.theme.color.text.formLabel : "#EC5757"};
  transition: color 0.05s;
`;

const DatePickerStyled = styled(ReactDatePicker)`
  width: 100%;
  border: 1px solid
    ${(props) => (props.valid ? props.theme.color.form.fieldBorder : "#EC5757")};
  border-radius: 4px;
  padding: 0.78rem 0.7rem;
  padding-bottom: 0.5rem;
  background: ${(props) => props.theme.color.form.fieldBg};
  outline: none;
  ${fontStylesA}
  color: ${(props) => props.theme.color.text.heading};
  transition: color 0.05s, border 0.05s, background 0.05s;

  ::placeholder {
    color: ${(props) => props.theme.color.text.placeholder};
    transition: color 0.05s;
  }

  :focus {
    outline: 0;
    box-shadow: ${(props) => props.theme.color.text.boxShadow};
    border-radius: 4px;
    border-color: transparent;
    -webkit-appearance: none;
    z-index: 30;
  }

  ${(props) =>
    props.faded &&
    css`
      border: none;
      padding: 1rem 0;
      background: transparent;
      color: #4f546b;

      :focus {
        border: none;
      }
    `}
`;

const CalendarIcon = styled.img`
  position: absolute;
  right: 13px;
  bottom: 13px;
`;

const DatePicker = ({ label, name, valid, errorMessage, ...rest }) => {
  const [date, setDate] = useState();
  const removeErrors = useValidation((state) => state.removeErrors);

  return (
    <Wrapper>
      <Label htmlFor={name} valid={valid}>
        {label} {!valid && errorMessage}
      </Label>
      <DatePickerStyled
        {...rest}
        selected={date}
        onChange={(date) => {
          setDate(date);
          removeErrors([name]);
        }}
        id={name}
        name={name}
        valid={valid}
      />
      <CalendarIcon src="/images/icon-calendar.svg" alt="" />
    </Wrapper>
  );
};

export default React.memo(DatePicker);
