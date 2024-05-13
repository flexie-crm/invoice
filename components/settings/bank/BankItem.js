import React, { useState } from "react";
import shallow from "zustand/shallow";

import SelectBox from "@components/SyncSelectBox";
import useValidation from "@store/validations";
import { DeleteButton } from "@shared/Buttons";
import Input from "@components/Input";
import banks from "@data/banks.json";

const allCurrencyOptions = [
  { label: "LEK", value: "ALL", default: true },
  { label: "EUR", value: "EUR" },
  { label: "USD", value: "USD" },
];

const BankItem = ({ index, bank, onRemove }) => {
  const [bankState, setBankState] = useState({
    [`banks[${index}][id]`]: bank.id,
    [`banks[${index}][bank]`]: banks.filter(
      (bankElement) => bankElement.name === bank.bank
    ),
    [`banks[${index}][currency]`]: allCurrencyOptions.filter(
      (currencyElement) => currencyElement.value === bank.currency
    ),
    [`banks[${index}][iban]`]: bank.iban,
    [`banks[${index}][swift]`]: bank.swift,
  });
  const removeErrors = useValidation((state) => state.removeErrors);
  const { bankError, currencyError, ibanError, swiftError } = useValidation(
    (state) => ({
      bankError: state.errors?.[`banks[${index}].bank`],
      currencyError: state.errors?.[`banks[${index}].currency`],
      ibanError: state.errors?.[`banks[${index}].iban`],
      swiftError: state.errors?.[`banks[${index}].swift`],
    }),
    shallow
  );

  const handleBankOnChange = (name, value, options) => {
    setBankState({
      ...bankState,
      [`banks[${index}][bank]`]: value || "",
    });

    removeErrors([`banks[${index}].bank`]);
  };

  const handleCurrencyOnChange = (name, value, options) => {
    setBankState({
      ...bankState,
      [`banks[${index}][currency]`]: value || "",
    });

    removeErrors([`banks[${index}].currency`]);
  };

  const handleIbanOnChange = (e) => {
    setBankState({
      ...bankState,
      [e.target.name]: e.target.value,
    });

    removeErrors([`banks[${index}].iban`]);
  };

  const handleSwiftOnChange = (e) => {
    setBankState({
      ...bankState,
      [e.target.name]: e.target.value,
    });

    removeErrors([`banks[${index}].swift`]);
  };

  const handleRemoveBank = () => {
    onRemove(bank.id);
  };

  return (
    <div className="grid">
      <div className="col col-md col-sm" style={{maxWidth: '100px'}}>
        <SelectBox
          isSearchable={false}
          instanceId={`currency_${index}`}
          hideLabels={index > 0}
          label="Monedha"
          options={allCurrencyOptions}
          name={`banks[${index}][currency]`}
          onChangeCallback={handleCurrencyOnChange}
          value={bankState?.[`banks[${index}][currency]`]}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          valid={!currencyError}
          errorMessage={currencyError}
        />
      </div>
      <div className="col col-md col-sm col-4">
        <SelectBox
          isSearchable={false}
          instanceId={`bank_${index}`}
          placeholder="Zgjidh Banken"
          hideLabels={index > 0}
          label="Banka"
          options={banks}
          name={`banks[${index}][bank]`}
          onChangeCallback={handleBankOnChange}
          value={bankState?.[`banks[${index}][bank]`]}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          valid={!bankError}
          errorMessage={bankError}
        />
      </div>
      <div className="col col-md col-sm col-2">
        <Input
          label="SWIFT"
          type="text"
          placeholder="SWIFT"
          name={`banks[${index}][swift]`}
          hideLabels={index > 0}
          value={bankState?.[`banks[${index}][swift]`] || ""}
          onChange={handleSwiftOnChange}
          valid={!swiftError}
          errorMessage={swiftError}
        />
      </div>
      <div className="col col-md col-sm">
        <Input
          label="IBAN"
          type="text"
          placeholder="Vendos IBAN"
          name={`banks[${index}][iban]`}
          hideLabels={index > 0}
          value={bankState?.[`banks[${index}][iban]`] || ""}
          onChange={handleIbanOnChange}
          valid={!ibanError}
          errorMessage={ibanError}
        />
      </div>

      {index > 0 && (
        <div
          className={`col col-1 col-md col-sm mb-10${
            index == 0 ? " disabled-button-wrapper" : ""
          }`}
          style={{ flex: "0 0 auto" }}
        >
          <DeleteButton
            type="button"
            className={`pb-10${index == 0 ? " mt-20 disabled-button" : ""}`}
            onClick={handleRemoveBank}
          />
        </div>
      )}

      <div className="hidden">
        <Input
          type="hidden"
          name={`banks[${index}][id]`}
          value={bankState?.[`banks[${index}][id]`] || ""}
        />
      </div>
    </div>
  );
};

export default React.memo(BankItem);
