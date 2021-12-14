import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import shallow from "zustand/shallow";
import serialize from "form-serialize";

import { tcrValidation } from "@data/Form";
import Input from "@components/Input";
import Button from "@shared/Buttons";
import Checkbox from "@components/Checkbox";
import SelectBox from "@components/SyncSelectBox";

import useValidation from "@store/validations";
import { parseFloatExt } from "@utilities/Form";

import { SubmissionMessage, ExplainSuccess } from "@shared/SharedStyle";
import { fontStylesA } from "@shared/Typography";

const ExplainBox = styled.div`
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  flex-basis: fit-content;
  ${ExplainSuccess}
`;

const CurrencyWrapper = styled.div`
  display: inline-flex;
  gap: 1rem;
`;

const CurrencyLabel = styled.label`
  ${fontStylesA}
  color: ${(props) => props.theme.color.text.formLabel};
  transition: color 0.05s;
  width: 100%;
  margin-bottom: 0.5rem;
  display: block;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: inherit;

  button {
    padding: 0.8rem 1.3rem;
  }
`;

const TcrOperations = () => {
  const { data: session } = useSession();
  const [tcrOperation, setTcrOperation] = useState();
  const [currency, setCurrency] = useState("ALL");
  const [currencyRate, setCurrencyRate] = useState();
  const [total, setTotal] = useState();
  const [operation, setOperation] = useState();
  const [isFormPosting, setIsFormPosting] = useState();
  const setErrors = useValidation((state) => state.setErrors);

  const { tcrOperationError, tcrTotalError, currencyRateError } = useValidation(
    (state) => ({
      tcrOperationError: state.errors?.tcr_operation,
      tcrTotalError: state.errors?.tcr_total,
      currencyRateError: state.errors?.currency_rate,
    }),
    shallow
  );

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleCurrencyRateChange = (e) => {
    setCurrencyRate(e.target.value);
  };

  const handleTotalChange = (e) => {
    setTotal(e.target.value);
  };

  const tcrForm = useRef();
  const onTcrOperationSubmit = async (e) => {
    e.preventDefault();
    const data = serialize(tcrForm.current, { hash: true });

    try {
      await tcrValidation.validate(data, {
        abortEarly: false,
      });

      // Fetch request here
      setIsFormPosting(true);

      const done = await (
        await fetch("/api/get/token", {
          method: "POST",
          body: JSON.stringify({
            method: "FX_TCR_OPERATION",
            data: {
              method: "POST",
              body: JSON.stringify({
                operation: data.tcr_operation,
                amount: (
                  parseFloatExt(data.tcr_total * currencyRate || 1) || 0
                ).toFixed(2),
              }),
            },
          }),
        })
      ).json();

      if (done.ok) {
        setTcrOperation({
          type: "success",
          message: "Deklarimi i arkës u dërgua me sukses.",
        });
      } else {
        setTcrOperation({
          type: "error",
          message:
            done.fz_error_message ||
            "Deklarimi i arkës dështoi, provojeni përsëri.",
        });
      }

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

  useEffect(() => {
    if (currency !== "ALL") {
      fetch("https://flexie.io/currency")
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setCurrencyRate(json.currency[currency]);
        });
    }
  }, [currency]);

  return (
    <>
      {tcrOperation && (
        <SubmissionMessage
          messageType={tcrOperation.type}
          dangerouslySetInnerHTML={{ __html: tcrOperation.message }}
        ></SubmissionMessage>
      )}
      <ExplainBox
        className="col col-md col-sm col-12"
        style={{ padding: "1rem" }}
      >
        <p>
          Kodi TCR për këtë llogari është <b>{session?.user?.tcr_code}</b>. Ju
          mund të deklaroni depozitim, tërheqje ose balancën fillestare.
        </p>
      </ExplainBox>
      <div className="col col-md col-sm col-12">
        <form ref={tcrForm} method="POST" onSubmit={onTcrOperationSubmit}>
          <div className="grid">
            <div className="col col-6 col-sm col-md">
              <CurrencyLabel>Veprimi me arkën është në monedhën</CurrencyLabel>
              <CurrencyWrapper
                onChange={handleCurrencyChange}
                style={{ marginTop: "10px", marginBottom: "13px" }}
              >
                <Checkbox
                  name="currency"
                  type="radio"
                  label="ALL"
                  value="ALL"
                  defaultChecked={currency === "ALL"}
                />
                <Checkbox
                  name="currency"
                  type="radio"
                  label="EUR"
                  value="EUR"
                  defaultChecked={currency === "EUR"}
                />
                <Checkbox
                  name="currency"
                  type="radio"
                  label="USD"
                  value="USD"
                  defaultChecked={currency === "USD"}
                />
              </CurrencyWrapper>
            </div>
            <div className="col col-6 col-sm col-md">
              {currency !== "ALL" && (
                <Input
                  name="currency_rate"
                  label="Kursi i ditës"
                  onChange={handleCurrencyRateChange}
                  value={currencyRate || ""}
                  valid={!currencyRateError}
                  errorMessage={currencyRateError}
                />
              )}
            </div>

            <div className="col col-6 col-sm col-md">
              <SelectBox
                instanceId
                label="Veprimi në Arkë"
                options={[
                  { label: "Gjëndja Fillestare", value: "INITIAL" },
                  { label: "Depozitim", value: "DEPOSIT" },
                  { label: "Tërheqje", value: "WITHDRAW" },
                ]}
                name="tcr_operation"
                placeholder="Zgjidh Veprimin"
                onChangeCallback={(name, value, options) => {
                  setOperation(value?.value);
                }}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                valid={!tcrOperationError}
                errorMessage={tcrOperationError}
              />
            </div>
            <div className="col col-6 col-sm col-md">
              <Input
                type="number"
                name="tcr_total"
                placeholder="0.00"
                label="Totali i veprimit në Arkë"
                onChange={handleTotalChange}
                value={total || ""}
                valid={!tcrTotalError}
                errorMessage={tcrTotalError}
              />
            </div>
            <div className="col col-12 flex">
              <ButtonWrapper className="mr-20">
                <Button disabled={isFormPosting} type="submit">
                  {isFormPosting ? "Deklaro..." : "Deklaro"}
                </Button>
              </ButtonWrapper>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TcrOperations;
