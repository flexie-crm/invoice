import styled from "styled-components";
import { TouchScrollable } from "react-scrolllock";
import React, { useEffect, useState } from "react";
import Store from "store";
import { useSession } from "next-auth/react";

import Items from "./Items";
import SelectBox from "../form/SyncSelectBox";
import Checkbox from "./Checkbox";

import { fontStylesA } from "@shared/Typography";
import DatePicker from "./DatePicker";
import Client from "./client/Client";
import Collapse from "@kunukn/react-collapse";
import Total from "./Total";
import localState from "@libs/localState";
import useValidation from "@store/validations";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 1.4rem;
  padding-left: 0.8rem;
  padding-bottom: 1rem;
  padding-top: 1.4rem;
  overflow-y: auto;

  @media only screen and (min-width: 500px) {
    padding-right: 2rem;
    padding-left: 2rem;
    padding-top: 2rem;
  }
`;

const Collapsed = styled(Collapse)`
  border-bottom: 1px solid ${(props) => props.theme.color.form.fieldBorder};
  border-left: 1px solid ${(props) => props.theme.color.form.fieldBorder};
  border-right: 1px solid ${(props) => props.theme.color.form.fieldBorder};
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 0.7rem;

  .collapse-css-transition {
    transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${(props) => (!props.isOpen ? "border: none; display: none;" : "")}
`;

const FieldSet = styled.fieldset`
  border: none;
`;

const Legend = styled.legend`
  margin-bottom: 1.5rem;
  ${fontStylesA}
  color: #7C5DFA;
  font-weight: bold;
`;

const Errors = styled.div``;

const Error = styled.div`
  color: #ec5757;
  font-size: 0.5rem;
  font-weight: bold;
  line-height: 1rem;
`;

const Panel = styled.div``;

const PanelHeader = styled.div`
  background-color: ${(props) => props.theme.color.form.fieldBg};
  padding: 0.7rem;
  cursor: pointer;
  z-index: 10;
  border: 1px solid ${(props) => props.theme.color.form.fieldBorder};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;

  span {
    ${fontStylesA}

    cursor: pointer;
    transition: background 0.05s, color 0.05s;
    outline: none;
    display: flex;
    align-self: center;
  }

  :hover svg {
    transition: all 0.35s;
    fill: ${(props) => props.theme.color.text.arrowHover};
  }

  svg {
    transition: all 0.35s;
    fill: ${(props) => props.theme.color.text.arrow};
  }

  ${(props) =>
    props.opened
      ? "border-bottom-left-radius: 0; border-bottom-right-radius: 0; svg { transform: rotate(-90deg); }"
      : ""}
`;

const InvoiceTypeWrapper = styled.div`
  display: inline-flex;
  gap: 1rem;
`;

const dueDate = [
  { label: "Neser", value: 1 },
  { label: "Per 1 Jave", value: 7 },
  { label: "Per 14 Dite", value: 14, default: true },
  { label: "Per 1 Muaj", value: 30 },
];

const paymentMethods = [
  { label: "CASH", value: "BANKNOTE" },
  { label: "BANK", value: "ACCOUNT", default: true },
  { label: "CREDIT CARD", value: "CARD" },
];

const documentType = [
  { label: "Fature Standarte P1", value: "P1", default: true },
  { label: "Fature Standarte P2", value: "P2", default: true },
  { label: "Fature Parapagimi P6", value: "P6" },
];

const Fields = () => {
  const errors = useValidation((state) => state.errors);
  const removeErrors = useValidation((state) => state.removeErrors);
  const [isCollapsedOpen, setIsCollapsedOpen] = localState(
    "@dueDatePanel",
    false
  );
  const [invoiceType, setInvoiceType] = localState("@invoiceType", "b2b");

  const [invoiceSettings, setInvoiceSettings] = localState("@invoiceSettings", {
    payment_method: { label: "BANK", value: "BANK" },
  });

  const [bankDetails, setBankDetails] = useState();
  const { data: session } = useSession();

  const handleInvoiceTypeChange = (e) => {
    setInvoiceType(e.target.value);
  };

  const handleSelectOnChange = (name, value, options) => {
    setInvoiceSettings({
      ...invoiceSettings,
      [name]: value,
    });

    removeErrors([name]);
  };

  useEffect(async () => {
    // Get banks from local storage
    if (Store.get("@banks") !== undefined) {
      setBankDetails(
        Store.get("@banks").map((bank) => ({
          label: bank.currency + " - " + bank.bank,
          value: JSON.stringify(bank),
        }))
      );
    } else {
      // Do another try by asking in Flexie if there are any
      try {
        const getBanks = await (
          await fetch("/api/get/token", {
            method: "POST",
            body: JSON.stringify({
              method: "FX_GET_BANKS",
              data: {
                method: "POST",
                body: JSON.stringify({
                  key: session?.user?.key,
                }),
              },
            }),
          })
        ).json();

        setBankDetails(
          getBanks.map((bank) => ({
            label: bank.currency + " - " + bank.bank,
            value: JSON.stringify(bank),
          }))
        );

        Store.set("@banks", getBanks);
      } catch (e) {
        // Decide what to do on exceptions
      }
    }

    // Firing on mount/render only
  }, []);

  return (
    <TouchScrollable>
      <Wrapper id="fields-wrapper">
        <FieldSet>
          <Legend>Tipi i fatures</Legend>
          <InvoiceTypeWrapper
            onChange={handleInvoiceTypeChange}
            className="mb-30"
          >
            <Checkbox
              name="invoice_type"
              type="radio"
              label="B2B"
              value="b2b"
              defaultChecked={invoiceType === "b2b"}
            />
            <Checkbox
              name="invoice_type"
              type="radio"
              label="B2C"
              value="b2c"
              defaultChecked={invoiceType === "b2c"}
            />
            <Checkbox
              name="invoice_type"
              type="radio"
              label="Auto"
              value="auto"
              defaultChecked={invoiceType === "auto"}
            />
            <Checkbox
              name="invoice_type"
              type="radio"
              label="Export"
              value="export"
              defaultChecked={invoiceType === "export"}
            />
          </InvoiceTypeWrapper>
        </FieldSet>

        {invoiceType !== "b2c" && <Client />}

        {(invoiceType === "b2b" || invoiceType === "export") && (
          <Panel className="mb-30 mt-20">
            <PanelHeader
              opened={isCollapsedOpen}
              onClick={() => setIsCollapsedOpen((state) => !state)}
            >
              <span>Afati pageses dhe periudha e faturimit</span>
              <span className="icon">
                <svg
                  height="20"
                  width="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
              </span>
            </PanelHeader>
            <Collapsed
              addState
              collapseHeight="auto"
              style={{ overflow: "inherit" }}
              isOpen={isCollapsedOpen}
            >
              <div className="grid pt-10">
                <div className="col col-sm col-md">
                  <SelectBox
                    label="Afati Pageses"
                    name="due_date"
                    onChangeCallback={handleSelectOnChange}
                    value={
                      invoiceSettings?.due_date && {
                        label: invoiceSettings?.due_date?.label,
                        value: invoiceSettings?.due_date?.value,
                      }
                    }
                    options={dueDate}
                    valid={!errors?.due_date}
                    errorMessage={errors?.due_date}
                  />
                </div>
                <div className="col col-sm col-md">
                  <DatePicker
                    label="Fillimi periudhes"
                    name="period_start"
                    placeholderText="Zgjidh nje date"
                    valid={!errors?.period_start}
                    errorMessage={errors?.period_start}
                    dateFormat="yyyy-MM-dd"
                    onChange={() => removeErrors(["period_start"])}
                  />
                </div>
                <div className="col col-sm col-md">
                  <DatePicker
                    label="Mbarimi periudhes"
                    name="period_end"
                    placeholderText="Zgjidh nje date"
                    valid={!errors?.period_end}
                    errorMessage={errors?.period_end}
                    dateFormat="yyyy-MM-dd"
                    onChange={() => removeErrors(["period_end"])}
                  />
                </div>
              </div>
            </Collapsed>
          </Panel>
        )}

        <FieldSet className={invoiceType === "auto" && "mt-15"}>
          <Legend>Detajet e farures</Legend>
          <div className="grid">
            <div className="col col-sm">
              <SelectBox
                label="Menyra e Pageses"
                name="payment_method"
                options={paymentMethods}
                valid={!errors?.payment_method}
                errorMessage={errors?.payment_method}
                onChangeCallback={handleSelectOnChange}
                value={invoiceSettings?.payment_method}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </div>
            <div className="col col-sm">
              <SelectBox
                label="Banka"
                name="bank"
                placeholder="Zgjidh Banken"
                onChangeCallback={handleSelectOnChange}
                value={
                  invoiceSettings?.bank && {
                    label: invoiceSettings?.bank?.label,
                    value: invoiceSettings?.bank?.value,
                  }
                }
                options={bankDetails}
                valid={!errors?.bank}
                errorMessage={errors?.bank}
                isDisabled={
                  ["BANKNOTE", "CARD"].includes(
                    invoiceSettings?.payment_method?.value
                  ) || invoiceType !== "b2b"
                }
              />
            </div>
            <div className="col col-sm">
              <SelectBox
                label="Tipi Fatures"
                name="business_process"
                onChangeCallback={handleSelectOnChange}
                value={
                  invoiceSettings?.business_process && {
                    label: invoiceSettings?.business_process?.label,
                    value: invoiceSettings?.business_process?.value,
                  }
                }
                options={documentType}
                isDisabled={
                  ["BANKNOTE", "CARD"].includes(
                    invoiceSettings?.payment_method?.value
                  ) || invoiceType !== "b2b"
                }
                valid={!errors?.invoice_type}
                errorMessage={errors?.invoice_type}
              />
            </div>
          </div>
        </FieldSet>
        <div className="mt-30">{<Items invoiceType={invoiceType} />}</div>
        <Total />
      </Wrapper>
    </TouchScrollable>
  );
};

export default React.memo(Fields);
