import React, { useState, useEffect } from "react";
import styled from "styled-components";
import shallow from "zustand/shallow";
import Checkbox from "@components/Checkbox";
import { fontStylesA } from "@shared/Typography";
import Input from "@components/Input";
import { formatCurrency } from "@utilities/Form";
import localState from "@libs/localState";
import useTotals from "@store/totals";
import useValidation from "@store/validations";

const WrapperTotal = styled.div``;
const CurrencyWrapper = styled.div`
  display: inline-flex;
  gap: 1rem;
`;

const WrapperNumbers = styled.div`
  margin-right: 0;

  @media only screen and (min-width: 500px) {
    margin-right: 2.4rem;
  }
`;

const TotalLabel = styled.p`
  ${fontStylesA}
  text-align: left;

  @media only screen and (min-width: 500px) {
    text-align: right;
  }
`;

const TotalValue = styled.p`
  ${fontStylesA}
  text-align: left;

  @media only screen and (min-width: 500px) {
    text-align: right;
  }
`;

const CurrencyRate = styled.div``;

const Total = () => {
  const totals = useTotals((state) => state.totals);
  const [currency, setCurrency] = localState("@usedCurrency", "ALL");
  const [currencyRate, setCurrencyRate] = useState();

  const { currencyRateError } = useValidation(
    (state) => ({
      currencyRateError: state.errors?.currency_rate,
    }),
    shallow
  );

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

  const handleChangeCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const handleCurrencyRateChange = (e) => {
    setCurrencyRate(e.target.value);
  };

  return (
    <WrapperTotal className="mt-30">
      <div className="grid">
        <div className="col col-md mb-30 col-sm">
          <CurrencyWrapper onChange={handleChangeCurrency}>
            <Checkbox
              name="currency"
              type="radio"
              label="LEK"
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

          {currency !== "ALL" && (
            <CurrencyRate
              className="mt-20 col col-sm col-md col-5"
              style={{ marginLeft: "-8px", marginRight: "-8px" }}
            >
              <Input
                label="Kursi i dites"
                name="currency_rate"
                value={currencyRate || ""}
                onChange={handleCurrencyRateChange}
                placeholder="0.00"
                style={{ width: "calc(100% + 16px)" }}
                valid={!currencyRateError}
                errorMessage={currencyRateError}
              />
            </CurrencyRate>
          )}
        </div>
        <WrapperNumbers className="col col-5 col-md col-sm col-last">
          <div className="grid">
            <div className="col col-6">
              <TotalLabel>TVSH Total</TotalLabel>
            </div>
            <div className="col col-6">
              <TotalValue>
                {currency} {formatCurrency(totals.vatTotal)}
              </TotalValue>
            </div>
          </div>
          <div className="grid">
            <div className="col col-6">
              <TotalLabel>Total pa TVSH</TotalLabel>
            </div>
            <div className="col col-6">
              <TotalValue>
                {currency} {formatCurrency(totals.totalBeforeVat)}
              </TotalValue>
            </div>
          </div>
          <div className="grid">
            <div className="col col-6">
              <TotalLabel>Total me TVSH</TotalLabel>
            </div>
            <div className="col col-6">
              <TotalValue>
                {currency} {formatCurrency(totals.totalAfterVat)}
              </TotalValue>
            </div>
          </div>
          <div className="grid">
            <div className="col col-6">
              <TotalLabel style={{ fontSize: "1rem", fontWeight: 600 }}>
                Totali Fatures
              </TotalLabel>
            </div>
            <div className="col col-6">
              <TotalValue style={{ fontSize: "1rem", fontWeight: 600 }}>
                {currency} {formatCurrency(totals.totalAfterVat)}
              </TotalValue>
            </div>
          </div>

          {/* Handle all totals hidden inputs here */}
          <Input type="hidden" name="vat_total" value={totals.vatTotal} />
          <Input type="hidden" name="total_discount" value={0} />
          <Input
            type="hidden"
            name="total_without_vat"
            value={totals.totalBeforeVat}
          />
          <Input
            type="hidden"
            name="total_with_vat"
            value={totals.totalAfterVat}
          />
        </WrapperNumbers>
      </div>
    </WrapperTotal>
  );
};

export default React.memo(Total);
