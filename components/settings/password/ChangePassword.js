import { useState, useEffect } from "react";
import styled from "styled-components";
import shallow from "zustand/shallow";
import crypto from "crypto";

import useLoader from "@store/loaders";
import useValidation from "@store/validations";

import { SubmissionMessage, ExplainSuccess } from "@shared/SharedStyle";
import { resetPasswordValidation } from "@data/Form";

import Input from "@components/Input";
import Button from "@shared/Buttons";

const ChangePasswordButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  button {
    padding: 0.8rem 1.3rem;
  }
`;

const ExplainBox = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  flex-basis: fit-content;
  ${ExplainSuccess}
`;

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState();
  const setErrors = useValidation((state) => state.setErrors);
  const removeErrors = useValidation((state) => state.removeErrors);
  const { passwordError, repeatPasswordError } = useValidation(
    (state) => ({
      passwordError: state.errors?.password,
      repeatPasswordError: state.errors?.repeatPassword,
    }),
    shallow
  );

  const isFormPosting = useLoader((state) => state.isFormPosting);
  const { setIsFormPosting } = useLoader((state) => ({
    setIsFormPosting: state.setIsFormPosting,
  }));

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await resetPasswordValidation.validate(
        { password, repeatPassword },
        {
          abortEarly: false,
        }
      );

      // Fetch request here
      setIsFormPosting(true);
      const changed = await (
        await fetch("/api/get/token", {
          method: "POST",
          body: JSON.stringify({
            method: "FX_CHANGE_PASS",
            data: {
              method: "POST",
              body: JSON.stringify({
                newPassword: crypto
                  .createHash("md5")
                  .update(password)
                  .digest("hex"),
              }),
            },
          }),
        })
      ).json();

      if (changed.ok) {
        setPasswordChanged({
          type: "success",
          message: "Flajekalimi u ndryshua me sukses.",
        });
      } else {
        setPasswordChanged({
          type: "error",
          message: "Flajekalimi nuk u ndryshua, provojeni perseri.",
        });
      }

      setIsFormPosting(false);
    } catch (errors) {
      // Just in case set it to false here too
      setIsFormPosting(false);

      let addErrors = {};

      errors.inner.map((err) => {
        addErrors = { ...addErrors, [err.path]: err.message };
      });

      setErrors(addErrors);
    }

    setTimeout(() => setPasswordChanged(false), 5000);
  };

  useEffect(() => {
    removeErrors(["password"]);
  }, [password]);

  useEffect(() => {
    removeErrors(["repeatPassword"]);
  }, [repeatPassword]);

  return (
    <>
      {passwordChanged && (
        <SubmissionMessage
          messageType={passwordChanged.type}
          dangerouslySetInnerHTML={{ __html: passwordChanged.message }}
        ></SubmissionMessage>
      )}
      <ExplainBox
        className="col col-md col-sm col-12"
        style={{ padding: "1rem" }}
      >
        <p>
          Ndryshoni fjalekalimin tuaj. Kujdes! Fjalekalimi i ri duhet te jete
          minimumi me 8 shkronja, kombinuar edhe me numra.
        </p>
      </ExplainBox>
      <div className="col col-md col-sm col-6">
        <Input
          name="password"
          type="password"
          label="Fjalekalimi i ri"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          valid={!passwordError}
          errorMessage={passwordError}
        />
      </div>
      <div className="col col-md col-sm col-6">
        <Input
          name="repeatPassword"
          label="Perserit Fjalekalimin"
          type="password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          valid={!repeatPasswordError}
          errorMessage={repeatPasswordError}
        />
      </div>

      <div className="col col-12">
        <ChangePasswordButtonWrapper>
          <Button disabled={isFormPosting} onClick={handlePasswordChange}>
            {isFormPosting ? "Ndrysho..." : "Ndrysho"}
          </Button>
        </ChangePasswordButtonWrapper>
      </div>
    </>
  );
};

export default ChangePassword;
