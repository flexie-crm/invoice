import { useField } from "formik";
import styled from "styled-components";

import { fontStylesA } from "../shared/Typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${fontStylesA}
`;

const Label = styled.label`
  color: ${(props) => props.theme.color.text.formLabel};
  transition: color 0.05s;
`;

const SelectWrapper = styled.div`
  position: relative;
  grid-column: 1 / -1;

  ::after {
    content: url(/images/icon-arrow-down.svg);
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.form.fieldBorder};
  border-radius: 4px;
  padding: 0.8rem 0.9rem;
  background: ${(props) => props.theme.color.form.fieldBg};
  appearance: none;
  outline: none;
  ${fontStylesA}
  color: ${(props) => props.theme.color.text.heading};
  cursor: pointer;
  transition: color 0.05s, border 0.05s, background 0.05s;

  :focus {
    border: 1px solid #9277ff;
  }
`;

export default function Select({ label, name, options }) {
  const [field] = useField(name);

  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <SelectWrapper>
        <StyledSelect {...field}>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </StyledSelect>
      </SelectWrapper>
    </Wrapper>
  );
}
