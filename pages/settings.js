import { useEffect, useRef, useState, useCallback } from "react";
import Head from "next/head";
import Router from "next/router";
import { getSession, signIn } from "next-auth/react";
import styled, { css } from "styled-components";
import Cookies from "cookies";
import { useCookies } from "react-cookie";
import shallow from "zustand/shallow";
import { v4 as uuidv4 } from "uuid";
import serialize from "form-serialize";
import Store from "store";

import Input from "@components/Input";
import Button from "@shared/Buttons";
import Bank from "@components/bank";

import useValidation from "@store/validations";
import useLoader from "@store/loaders";
import { resetPasswordValidation, banksValidation } from "@data/Form";

import HomeLink from "@components/invoice/HomeLink";
import configForm from "@data/configForm.json";
import {
  FlexieFormInput,
  ExplainSuccess,
  ExplainError,
} from "@shared/SharedStyle";
import { ConfigSkeleton } from "@shared/ConfigSkeleton";

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 75.85rem;
  height: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 3.5rem 1.5rem;

  @media only screen and (min-width: 768px) {
    padding: 3.5rem 3rem 2.8rem;
  }

  @media only screen and (min-width: 1024px) {
    padding: 4.5rem 3rem 2.8rem;
  }
`;

const ExplainBox = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  flex-basis: fit-content;
  ${ExplainSuccess}
`;

const SettingItemsWrapper = styled.div`
  width: 100%;
  margin: 0;
`;

const SettingItem = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  font-family: "Spartan", sans-serif;
  padding: 0.7rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 10rem;
  color: ${(props) => props.theme.color.text.heading};

  &:hover {
    color: #fff;
    background: #a994ff;
  }

  ${(props) =>
    props.isSelected &&
    css`
      color: #fff;
      background: #7c5dfa;

      &:hover {
        background: #7c5dfa !important;
      }
    `}
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  button {
    padding: 0.8rem 1.3rem;
  }
`;

const SubmissionMessage = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  flex: 100%;
  ${(props) =>
    props.messageType === "success" ? ExplainSuccess : ExplainError}
`;

const FlexieFormWrapper = styled.div`
  .explain-error {
    background-color: #f5eaea;
    color: #721c24;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-left: 3px solid #e892a0;
    font-size: 0.8rem;
    line-height: 1.6;
    font-family: "Spartan", sans-serif;
  }

  .explain-success {
    ${ExplainSuccess}
  }

  .flexieForm-component-button {
    align-items: self-start;
  }

  .alert {
    display: none;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: "Spartan", sans-serif;
    -webkit-transition: color 0.05s;
    transition: color 0.05s;
    color: #4f546b;
    font-size: 0.75rem;
    line-height: 1.125;
  }

  .form-group p.small {
    margin-top: -4px;
    font-size: 85%;
    color: ${(props) => props.theme.color.text.formLabel};
  }

  .has-error input {
    border: 1px solid #ec5757;
  }

  .has-error label,
  .has-error .help-block {
    color: #ec5757;
  }

  .has-error .help-block,
  .has-error .flexieForm-errors {
    display: none !important;
  }

  .row {
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -8px 0 -8px;
  }

  .col-sm-6 {
    flex-basis: 50%;
    max-width: 50%;
  }

  @media only screen and (max-width: 624px) {
    .col-sm-6 {
      flex: 100%;
      max-width: 100%;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: "Spartan", sans-serif;
    -webkit-transition: color 0.05s;
    transition: color 0.05s;
    color: ${(props) => props.theme.color.text.formLabel};
    font-size: 0.75rem;
    line-height: 1.125;
  }

  input {
    ${FlexieFormInput}
  }

  input:read-only,
  input:disabled {
    background-color: ${(props) => props.theme.color.text.disabled};
    opacity: 0.8;
  }

  .flexieForm-component-file .fa-window-close {
    box-sizing: border-box;
    position: relative;
    transform: scale(var(--ggs, 1));
    width: 1rem;
    height: 1rem;
    border: 0.1rem solid;
    border-radius: 3px;
    display: inherit;
    margin-left: 4px;
  }
  .flexieForm-component-file .fa-window-close::after,
  .flexieForm-component-file .fa-window-close::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 0.5rem;
    height: 0.12rem;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 0.33rem;
    left: 0.15rem;
  }
  .flexieForm-component-file .fa-window-close::after {
    transform: rotate(-45deg);
  }

  .flexieForm-component-file p.small {
    margin: 4px 0 9px;
    font-size: 85%;
    color: ${(props) => props.theme.color.text.formLabel};
  }

  h2.horizontal-rule {
    width: 100%;
    border-bottom: 1px dashed ${(props) => props.theme.color.form.fieldBorder};
    margin-bottom: 30px;
    padding-bottom: 2px;
  }

  .flexieForm-component-file {
    margin-bottom: 10px;
  }

  .flexieForm-component-file .progress {
    margin-bottom: 18px;
    height: 25px;
    border-radius: 2px;
    background: ${(props) => props.theme.color.form.fieldBg};
    overflow: hidden;
  }

  .flexieForm-component-file .progress-bar[aria-valuenow="0"] {
    color: ${(props) => props.theme.color.text.formLabel};
    min-width: 30px;
    background-color: transparent;
    background-image: none;
    box-shadow: none;
  }

  .flexieForm-component-file .progress-bar {
    box-shadow: none;
    transition: width 4s ease;

    float: left;
    width: 0%;
    height: 100%;
    font-size: 11px;
    line-height: 27px;
    text-align: center;
  }

  .flexieForm-component-file .progress-bar-success {
    background-color: #00b49c;
    color: #fff;
  }

  .flexieForm-component-file .fileSelector {
    padding: 15px;
    border: 3px dashed ${(props) => props.theme.color.form.fieldBorder};
    text-align: center;
    background: ${(props) => props.theme.color.form.fieldBg};
    color: ${(props) => props.theme.color.text.formLabel};
  }

  .flexieForm-component-file .fileSelector.fileDragOver {
    border-color: #0ea367;
  }

  .flexieForm-component-file .fileSelector a {
    color: ${(props) => props.theme.color.text.formLabel};
  }

  .flexieForm-component-file .col-md-9 {
    color: ${(props) => props.theme.color.text.formLabel};
    max-width: 75%;
    flex-basis: 75%;
    display: flex;
    align-items: end;
  }

  .flexieForm-component-file .col-md-3 {
    color: ${(props) => props.theme.color.text.formLabel};
    max-width: 25%;
    flex-basis: 25%;
    text-align: right;
    display: flex;
    align-items: end;
    justify-content: right;
  }

  .flexieForm-component-file .col-sm-12 {
    max-width: 100%;
    flex: 100%;
    padding: 0 8px 0 8px;
  }

  .flexieForm-component-file .col-sm-10 {
    max-width: 83.33333333%;
    flex-basis: 83.33333333%;
    padding-left: 3px;
    font-size: 84%;
    color: ${(props) => props.theme.color.text.formLabel};
    display: flex;
    align-items: center;
  }

  .flexieForm-component-file .col-sm-2 {
    max-width: 16.66666667%;
    flex-basis: 16.66666667%;
    text-align: right;
    padding-right: 8px;
    font-size: 84%;
    color: ${(props) => props.theme.color.text.formLabel};
    display: flex;
    align-items: center;
    justify-content: right;
  }

  .list-group {
    padding-left: 0;
  }

  .list-group-item {
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background: ${(props) => props.theme.color.form.fieldBg};
    border: 1px solid ${(props) => props.theme.color.form.fieldBorder};
  }

  .list-group-item:first-child {
    display: none;
  }

  .list-group-item:last-child {
    margin-bottom: 0;
    border-radius: 3px;
  }

  button {
    width: initial;
    border: none;
    border-radius: 10rem;
    padding: 1rem 1.5rem;
    background: #7c5dfa;

    color: white;
    font-family: "Spartan", sans-serif;
    font-size: 0.8rem;
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

    .loader-wrapper {
      z-index: 1000;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const BankList = styled.div``;

export default function Settings({ initialOpenedItem, user }) {
  const [cookies, setCookie] = useCookies(["openedItem"]);
  const [formLoaded, setFormLoaded] = useState(false);
  const [submitMessage, setSubmitMessage] = useState();

  const [banks, setBanks] = useState([
    {
      id: uuidv4(),
      bank: "",
      currency: "ALL",
      iban: "",
    },
  ]);

  useEffect(async () => {
    // Get banks from local storage
    if (Store.get("@banks") !== undefined) {
      setBanks(Store.get("@banks"));
    } else {
      // Do another try by asking in Flexie if there are any
      try {
        const getBanks = await (
          await fetch("/api/get/token", {
            method: "POST",
            body: JSON.stringify({
              method: "FX_GET_BANKS",
              data: {
                method: "GET",
              },
            }),
          })
        ).json();

        if (getBanks?.length > 0) {
          setBanks(getBanks);
          Store.set("@banks", getBanks);
        }
      } catch (e) {
        // Decide what to do on exceptions
      }
    }

    // Firing on mount/render only
  }, []);

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const isFormPosting = useLoader((state) => state.isFormPosting);
  const { setIsFormPosting } = useLoader((state) => ({
    setIsFormPosting: state.setIsFormPosting,
  }));

  const setErrors = useValidation((state) => state.setErrors);
  const removeErrors = useValidation((state) => state.removeErrors);

  const { passwordError, repeatPasswordError } = useValidation(
    (state) => ({
      passwordError: state.errors?.password,
      repeatPasswordError: state.errors?.repeatPassword,
    }),
    shallow
  );

  const handleRemoveBank = useCallback((id) => {
    setBanks((banks) => banks.filter((bank, i) => id !== bank.id));
  }, []);

  const bankForm = useRef();
  const onBankFormSubmit = async (e) => {
    e.preventDefault();
    const data = serialize(bankForm.current, { hash: true });

    try {
      await banksValidation.validate(data, {
        abortEarly: false,
      });

      // Fetch request here
      setIsFormPosting(true);
      const addBanks = await (
        await fetch("/api/get/token", {
          method: "POST",
          body: JSON.stringify({
            method: "FX_ADD_BANKS",
            data: {
              method: "POST",
              body: JSON.stringify(data),
            },
          }),
        })
      ).json();

      Store.set("@banks", data.banks);
      setIsFormPosting(false);
    } catch (errors) {
      let addErrors = {};
      errors.inner.map((err) => {
        addErrors = { ...addErrors, [err.path]: err.message };
      });

      setErrors(addErrors);
      setIsFormPosting(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await resetPasswordValidation.validate(
        { password, repeatPassword },
        {
          abortEarly: false,
        }
      );

      // setIsFormPosting(true);
      // Add post to Flexie here
    } catch (errors) {
      // Just in case set it to false here too
      // setIsFormPosting(false);

      let addErrors = {};

      errors.inner.map((err) => {
        addErrors = { ...addErrors, [err.path]: err.message };
      });

      setErrors(addErrors);
    }
  };

  useEffect(() => {
    removeErrors(["password"]);
  }, [password]);

  useEffect(() => {
    removeErrors(["repeatPassword"]);
  }, [repeatPassword]);

  const formRef = useRef();

  const handleSettingOpenedItem = (item) => {
    setCookie("openedItem", item, { path: "/" });
  };

  const switchFlexieForm = (type, submission) =>
    ({
      message: () =>
        setSubmitMessage({
          type: "success",
          message: submission.response_data,
        }),
      redirect: () => Router.push(submission.response_data),
      json: "",
      error: () =>
        setSubmitMessage({
          type: "error",
          message: submission.response_data,
        }),
    }[type]);

  const setValue = (user, form) => {
    form.getComponent("first_name").setValue(user.first_name);
    form.getComponent("last_name").setValue(user.last_name);
    form.getComponent("business_unit").setValue(user.business_unit);
    form.getComponent("email").setValue(user.email);
    form.getComponent("key").setValue(user.key);
    form.getComponent("id").setValue(user.id);
    form.getComponent("operator_code").setValue(user.operator_code);
    form.getComponent("phone").setValue(user.phone);
    form.getComponent("nipt").setValue(user.nipt);
  };

  useEffect(async () => {
    await import("@libs/formRender");

    let submittedData = {};
    FlexieForm.createForm(formRef.current, configForm, {
      i18n: {
        en: {
          "Drop files, or": "Hidh certifikaten ketu, ose",
          browse: "zgjidhe",
          Processing: "Duke procesuar",
          Complete: "Duke ngarkuar",
        },
      },
      hooks: {
        beforeSubmit: (submission, next) => {
          formRef.current.querySelector(
            "button[name='data[__submit]']"
          ).innerText = "Ndrysho...";

          formRef.current.querySelector(
            "button[name='data[__submit]']"
          ).disabled = true;

          submittedData = { ...submission.data };

          next();
        },
      },
    }).then((form) => {
      // Set initial values,
      // taken from session
      setValue(user, form);

      setTimeout(() => {
        setFormLoaded(true);
        formRef.current
          .querySelector("input[name='data[first_name]']")
          ?.focus();
      }, 500);

      form.on("componentError", (error) => {
        formRef.current.querySelector(
          "button[name='data[__submit]']"
        ).innerText = "Ndrysho";

        formRef.current.querySelector(
          "button[name='data[__submit]']"
        ).disabled = false;
      });

      // Register for the submit event to get the completed submission.
      form.on("submit", async (submission) => {
        // Set all fields after submit,
        // its better like this.
        setValue(submittedData, form);

        if (submission?.success === 1) {
          // Show message from Flexie response
          switchFlexieForm(submission.type, submission)();

          // Remove message after 2-3 seconds
          // Only if submission.type == message so its not an error
          if (submission.type === "message")
            setTimeout(() => setSubmitMessage(false), 10000);

          formRef.current.querySelector(
            "button[name='data[__submit]']"
          ).innerText = "Ndrysho";

          formRef.current.querySelector(
            "button[name='data[__submit]']"
          ).disabled = false;

          const session = await getSession();

          // Renew session as its updated
          if (session) {
            await signIn("flexie-auth", {
              key: session?.user?.key || "",
              redirect: false,
            });
          }
        }
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Fatura Konfigurime | Flexie CRM</title>
      </Head>
      <SettingsWrapper>
        <HomeLink />
        <SettingItemsWrapper className="grid">
          <div className="col col-md col-sm col-3">
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("konfigurime")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "konfigurime"
              }
            >
              Konfigurime
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("fjalekalimi")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "fjalekalimi"
              }
            >
              Fjalekalimi
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("bankat")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "bankat"
              }
            >
              Bankat
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("arka")}
              isSelected={(cookies?.openedItem || initialOpenedItem) === "arka"}
            >
              Arka
            </SettingItem>
            <SettingItem
              onClick={(e) => handleSettingOpenedItem("abonimi")}
              isSelected={
                (cookies?.openedItem || initialOpenedItem) === "abonimi"
              }
            >
              Abonimi
            </SettingItem>
          </div>
          <div className="col col-md col-sm col-9">
            <div
              className={`grid ${
                (cookies?.openedItem || initialOpenedItem) !== "konfigurime"
                  ? "hidden"
                  : ""
              }`}
            >
              {submitMessage && (
                <SubmissionMessage
                  messageType={submitMessage.type}
                  dangerouslySetInnerHTML={{ __html: submitMessage.message }}
                ></SubmissionMessage>
              )}

              {!formLoaded && (
                <FlexieFormWrapper className="col col-12 mb-0">
                  <ConfigSkeleton />
                </FlexieFormWrapper>
              )}

              <FlexieFormWrapper
                ref={formRef}
                id="config-form"
                className={`col col-12 mb-0 ${!formLoaded && "hidden"}`}
              />
            </div>

            <div
              className={`grid ${
                (cookies?.openedItem || initialOpenedItem) !== "bankat"
                  ? "hidden"
                  : ""
              }`}
            >
              <BankList className="col col-md col-sm col-12">
                <form ref={bankForm} method="POST" onSubmit={onBankFormSubmit}>
                  {banks.map((bank, index) => {
                    return (
                      <Bank
                        bank={bank}
                        onRemove={handleRemoveBank}
                        onChange={true}
                        key={bank.id}
                        index={index}
                      />
                    );
                  })}

                  <div className="grid">
                    <div className="col col-12 flex">
                      <LoginButtonWrapper
                        className="mr-20"
                        style={{ width: "inherit" }}
                      >
                        <Button disabled={isFormPosting} type="submit">
                          {isFormPosting ? "Ndrysho..." : "Ndrysho"}
                        </Button>
                      </LoginButtonWrapper>

                      {banks?.length < 10 && (
                        <LoginButtonWrapper style={{ width: "inherit" }}>
                          <Button
                            secondary
                            onClick={(e) => {
                              e.preventDefault();

                              setBanks([
                                ...banks,
                                {
                                  id: uuidv4(),
                                  bank: "",
                                  currency: "ALL",
                                  iban: "",
                                },
                              ]);
                            }}
                          >
                            Shto Banke
                          </Button>
                        </LoginButtonWrapper>
                      )}
                    </div>
                  </div>
                </form>
              </BankList>
            </div>

            <div
              className={`grid ${
                (cookies?.openedItem || initialOpenedItem) !== "fjalekalimi"
                  ? "hidden"
                  : ""
              }`}
            >
              <ExplainBox
                className="col col-md col-sm col-12"
                style={{ padding: "1rem" }}
              >
                <p>
                  Ndryshoni fjalekalimin tuaj. Kujdes! Fjalekalimi i ri duhet te
                  jete minimumi me 8 shkronja, kombinuar edhe me numra.
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
                <LoginButtonWrapper>
                  <Button onClick={handlePasswordChange}>Ndrysho</Button>
                </LoginButtonWrapper>
              </div>
            </div>
          </div>
        </SettingItemsWrapper>
      </SettingsWrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const cookies = new Cookies(context.req, context.res);

  return {
    props: {
      initialOpenedItem: cookies.get("openedItem") || "konfigurime",
      user: session.user,
    },
  };
}
