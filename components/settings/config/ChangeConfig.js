import { useEffect, useRef, useState } from "react";

import { signIn, getSession } from "next-auth/react";
import styled from "styled-components";
import configForm from "@data/configForm.json";
import { ConfigSkeleton } from "@shared/ConfigSkeleton";

import dayjs from "dayjs";
import "dayjs/locale/sq";

dayjs.locale("sq");

import {
  FlexieFormInput,
  ExplainSuccess,
  SubmissionMessage,
} from "@shared/SharedStyle";

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
    font-family: "Spartan", sans-serif;
    -webkit-transition: color 0.05s;
    transition: color 0.05s;
    color: #4f546b;
    font-size: 0.75rem;
    line-height: 1.51;
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
    font-family: "Spartan", sans-serif;
    -webkit-transition: color 0.05s;
    transition: color 0.05s;
    color: ${(props) => props.theme.color.text.formLabel};
    font-size: 0.75rem;
    line-height: 1.51;
  }

  input {
    ${FlexieFormInput}
  }

  input:read-only,
  input:disabled {
    background-color: ${(props) => props.theme.color.text.disabled};
  }

  .flexieForm-component-checkbox {
    margin-bottom: 15px;
  }

  .flexieForm-component-checkbox label {
    display: block;
    margin-bottom: 5px;
  }

  .flexieForm-component-checkbox .fx-checkbox-inline {
    display: inline-block;
    padding-right: 20px;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .flexieForm-component-checkbox .fx-checkbox {
    --background: #fff;
    --border: #d1d6ee;
    --border-hover: #bbc1e1;
    --border-active: #0099e5;
    --tick: #fff;
    position: relative;
  }
  .flexieForm-component-checkbox .fx-checkbox input,
  .flexieForm-component-checkbox .fx-checkbox svg {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    display: inline-block;
  }

  .flexieForm-component-checkbox .fx-checkbox span {
    display: inline-block;
    vertical-align: middle;
  }
  .flexieForm-component-checkbox .fx-checkbox input[type="radio"] {
    border-radius: 50% !important;
  }
  .flexieForm-component-checkbox .fx-checkbox input {
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
  .flexieForm-component-checkbox .fx-checkbox input:hover {
    --s: 3px;
    --b: var(--border-hover);
  }
  .flexieForm-component-checkbox .fx-checkbox input:checked {
    --b: var(--border-active);
  }
  .flexieForm-component-checkbox .fx-checkbox svg {
    pointer-events: none;
    fill: none;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: var(--stroke, var(--border-active));
    position: absolute;
    top: -1px;
    left: 0;
    width: 18px;
    height: 18px;
    transform: scale(var(--scale, 1)) translateZ(0);
    z-index: 31;
  }
  .flexieForm-component-checkbox .fx-checkbox.path input:checked {
    --s: 2px;
    transition-delay: 0.4s;
  }
  .flexieForm-component-checkbox .fx-checkbox.path input:checked + svg {
    --a: 16.1 86.12;
    --o: 102.22;
  }
  .flexieForm-component-checkbox .fx-checkbox.path svg {
    stroke-dasharray: var(--a, 86.12);
    stroke-dashoffset: var(--o, 86.12);
    transition: stroke-dasharray 0.6s, stroke-dashoffset 0.6s;
  }
  .flexieForm-component-checkbox .fx-checkbox.check-bounce {
    --stroke: var(--tick);
  }
  .flexieForm-component-checkbox .fx-checkbox.check-bounce input:checked {
    --s: 11px;
  }
  .flexieForm-component-checkbox .fx-checkbox.check-bounce input:checked + svg {
    animation: check-bounce 0.4s linear forwards 0.2s;
  }
  .flexieForm-component-checkbox .fx-checkbox.check-bounce svg {
    --scale: 0;
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

const ChangeConfig = ({ user }) => {
  const [formLoaded, setFormLoaded] = useState(false);
  const [submitMessage, setSubmitMessage] = useState();
  const formRef = useRef();

  const switchFlexieForm = (type, submission) =>
    ({
      message: () =>
        setSubmitMessage({
          type: "success",
          message: submission.response_data,
        }),
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
    const certDate = `
      <br />
      <p>
        Certifikata krijuar me: <b>${dayjs(
          user?.cert_issue_timestamp * 1000
        ).format("DD MMMM, YYYY")}</b>
      </p>
      <p>
        Certifikata skadon me: <b>${dayjs(
          user?.cert_expire_timestamp * 1000
        ).format("DD MMMM, YYYY")}</b>
      </p>
    `;

    const configFormTransformed = JSON.parse(
      JSON.stringify(configForm).replace(
        "{CERT_DATE}",
        certDate.replace(/\n|\r/g, "")
      )
    );

    await import("@libs/formRender");

    let submittedData = {};
    FlexieForm.createForm(formRef.current, configFormTransformed, {
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

          // Remove message after few seconds
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
      {submitMessage && (
        <SubmissionMessage
          messageType={submitMessage.type}
          dangerouslySetInnerHTML={{ __html: submitMessage.message }}
        ></SubmissionMessage>
      )}

      {!formLoaded && (
        <FlexieFormWrapper className="col col-12 mb-0">
          <ConfigSkeleton
            certIssued={user?.cert_issue_timestamp}
            certExpire={user?.cert_expire_timestamp}
            isInVat={user?.vat_enabled === "1"}
          />
        </FlexieFormWrapper>
      )}

      <FlexieFormWrapper
        ref={formRef}
        id="config-form"
        className={`col col-12 mb-0 ${!formLoaded && "hidden"}`}
      />
    </>
  );
};

export default ChangeConfig;
