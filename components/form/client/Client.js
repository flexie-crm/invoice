import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "@components/Input";

import AsyncSelectBox from "@components/AsyncSelectBox";
import SelectBox from "@components/SyncSelectBox";

import { fontStylesA } from "@shared/Typography";
import countries from "@data/countriesFull.json";
import useValidation from "@store/validations";
import useClient from "@store/client";
import throttle from "lodash.throttle";

const ClientWrapper = styled.div``;

const Legend = styled.legend`
  margin-bottom: 1.5rem;
  ${fontStylesA}
  color: #7C5DFA;
  font-weight: bold;
`;

const FieldSet = styled.fieldset`
  border: none;
`;

// Check NUIS whenever it's being updated, so we can lookup in background
// and trigger error message if neccessary.
const verifyNuis = throttle(
  async (data, token) =>
    await (
      await fetch("/api/get/token", {
        method: "POST",
        body: JSON.stringify({
          method: token,
          data: {
            method: "POST",
            body: JSON.stringify(data),
          },
        }),
      })
    ).json(),
  500
);

const getClientsRequest = throttle(
  (params, token) =>
    fetch("/api/get/token", {
      method: "POST",
      body: JSON.stringify({
        method: token,
        params,
        data: {
          method: "GET",
        },
      }),
    }).then((res) => res.json()),
  800
);

const Client = ({ isCorrective, invoiceToCorrect }) => {
  const errors = useValidation((state) => state.errors);
  const removeErrors = useValidation((state) => state.removeErrors);
  const setErrors = useValidation((state) => state.setErrors);
  const clientData = useClient((state) => state.client);
  const setClientData = useClient((state) => state.updateClient);

  const [nuisLabel, setNuisLabel] = useState("NIPT");
  const getClients = (inputValue) => {
    return getClientsRequest(`?__search=${inputValue}`, "FX_GET_CLIENTS");
  };

  useEffect(() => {
    return () => {
      setClientData({});
    };
  }, []);

  // Get track of client data
  const getCountries = countries
    .filter(
      (country) =>
        country.region === "Europe" ||
        country["alpha-3"] === "USA" ||
        country["alpha-3"] === "CAN" ||
        country["alpha-3"] === "TUR"
    )
    .map((country) => {
      return {
        label: country.name,
        value: country["alpha-3"],
      };
    });

  const handleOnChangeCallback = (name, value, options) => {
    try {
      const client = JSON.parse(value?.value || "[]");
      setClientData({
        nuis: client.nuis || "",
        address: client.client_address || "",
        city: client.client_city || "",
        country: client.client_country || "",
      });

      if (client.client_country !== "ALB") {
        setNuisLabel("TAX ID");
      }

      removeErrors(["client", "address", "city", "country", "nuis"]);
    } catch (e) {
      // Probably a new created company and the value is not JSON
      // So just do nothing here
    }
  };

  const handleCountryOnChange = (name, value, options) => {
    setClientData({
      ...clientData,
      country: value?.value || "",
    });

    if (value?.value && value?.value != "ALB") {
      setNuisLabel("TAX ID");
      removeErrors(["nuis"]);
    } else {
      setNuisLabel("NIPT");
    }
  };

  const clientDataOnChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(async () => {
    if (
      clientData?.nuis?.length > 9 &&
      (clientData?.country === "ALB" || !clientData?.country)
    ) {
      try {
        const nuis = await verifyNuis(
          {
            nuis: clientData?.nuis,
          },
          "FX_VERIFY_NUIS"
        );

        if (!nuis?.found) {
          setErrors({
            nuis: "- jo Aktive",
          });
        } else {
          removeErrors(["nuis"]);
        }
      } catch (e) {
        removeErrors(["nuis"]);
      }
    }
  }, [clientData?.nuis]);

  return (
    <>
      <FieldSet>
        <Legend>Te dhenat e klientit</Legend>
        <ClientWrapper className="grid">
          {isCorrective ? (
            <>
              <Input
                wrapperClassName="col col-8 col-md"
                valid={true}
                label="Klienti"
                name="dummy_client"
                value={invoiceToCorrect?.company}
                readOnly={true}
              />
              <Input
                hideLabels={true}
                type="hidden"
                name="client"
                value={invoiceToCorrect?.payload?.client}
              />
            </>
          ) : (
            <AsyncSelectBox
              wrapperClassName="col col-8 col-md"
              isCreatable={true}
              label="Kerko ose Shto Klient"
              name="client"
              placeholder="Kerko ose Shto"
              options={getClients}
              onChangeCallback={handleOnChangeCallback}
              valid={!errors?.client}
              errorMessage={errors?.client}
            />
          )}
          {isCorrective ? (
            <Input
              wrapperClassName="col col-4 col-md"
              valid={true}
              label={nuisLabel}
              name="nuis"
              value={invoiceToCorrect?.nuis || ""}
              readOnly={true}
            />
          ) : (
            <Input
              wrapperClassName="col col-4 col-md"
              valid={!errors?.nuis}
              errorMessage={errors?.nuis}
              label={nuisLabel}
              name="nuis"
              value={clientData?.nuis || ""}
              onChange={clientDataOnChange}
            />
          )}
        </ClientWrapper>
        <ClientWrapper className="grid">
          {isCorrective ? (
            <Input
              wrapperClassName="col col-6 col-md"
              label="Adresa"
              name="address"
              value={invoiceToCorrect?.address || ""}
              valid={true}
              readOnly={true}
            />
          ) : (
            <Input
              wrapperClassName="col col-6 col-md"
              label="Adresa"
              name="address"
              value={clientData?.address || ""}
              onChange={clientDataOnChange}
              valid={!errors?.address}
              errorMessage={errors?.address}
            />
          )}
          {isCorrective ? (
            <Input
              wrapperClassName="col col-3 col-md"
              label="Qyteti"
              name="city"
              value={invoiceToCorrect?.city || ""}
              valid={true}
              readOnly={true}
            />
          ) : (
            <Input
              wrapperClassName="col col-3 col-md"
              label="Qyteti"
              name="city"
              value={clientData?.city || ""}
              onChange={clientDataOnChange}
              valid={!errors?.city}
              errorMessage={errors?.city}
            />
          )}

          {isCorrective ? (
            <Input
              wrapperClassName="col col-3 col-md"
              label="Shteti"
              name="country"
              value={invoiceToCorrect?.country_code || ""}
              valid={true}
              readOnly={true}
            />
          ) : (
            <SelectBox
              isCreatable
              wrapperClassName="col col-3 col-md"
              label="Shteti"
              placeholder="Kerko ose Shto Kodin"
              options={getCountries}
              name="country"
              onChangeCallback={handleCountryOnChange}
              value={getCountries.find(
                (option) => option.value === clientData?.country
              )}
              getOptionLabel={(country) => country.label}
              getOptionValue={(country) => country.value}
              valid={!errors?.country}
              errorMessage={errors?.country}
            />
          )}
        </ClientWrapper>
      </FieldSet>
    </>
  );
};

export default React.memo(Client);
