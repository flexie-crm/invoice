import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  z-index: 10;
  background: ${(props) => props.theme.color.form.bg};
  transition: background 0.05s;

  @media only screen and (min-width: 900px) {
    top: 0;
    padding-left: 5rem;
  }
`;

const StyledForm = styled.form`
  display: grid;
  height: calc(100vh - 5rem);
  width: 100vw;
  max-width: 900px;
  padding: 0 0 0 0.8rem;
  position: relative;

  @media only screen and (min-width: 500px) {
    padding: 2.5rem 2rem 0 2.5rem;
  }

  @media only screen and (min-width: 600px) {
    padding: 0;
  }

  @media only screen and (min-width: 900px) {
    height: 100vh;
  }
`;

const Form = React.forwardRef((props, ref) => {
  const { children } = props;

  return (
    <Wrapper>
      <StyledForm ref={ref} {...props}>
        {children}
      </StyledForm>
    </Wrapper>
  );
});

export default React.memo(Form);
