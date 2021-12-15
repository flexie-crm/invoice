import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import serialize from "form-serialize";
import Store from "store";

import { banksValidation } from "@data/Form";
import useLoader from "@store/loaders";
import useValidation from "@store/validations";
import BankItem from "./BankItem";
import Button from "@shared/Buttons";

import { SubmissionMessage } from "@shared/SharedStyle";

const BankButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: inherit;

  button {
    padding: 0.8rem 1.3rem;
  }
`;

const BankList = () => {
  const [banksChanged, setBanksChanged] = useState();
  const setErrors = useValidation((state) => state.setErrors);
  const isFormPosting = useLoader((state) => state.isFormPosting);
  const { setIsFormPosting } = useLoader((state) => ({
    setIsFormPosting: state.setIsFormPosting,
  }));
  const [banks, setBanks] = useState([
    {
      id: uuidv4(),
      bank: "",
      currency: "ALL",
      iban: "",
    },
  ]);

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
      const changed = await (
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

      if (changed.ok) {
        setBanksChanged({
          type: "success",
          message: "Bankat u ndryshuan me sukses.",
        });
      } else {
        setBanksChanged({
          type: "error",
          message: "Bankat nuk u ndryshuan, provojeni perseri.",
        });
      }

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

  useEffect(async () => {
    // Get banks from local storage
    if (Store.get("@banks") !== undefined) {
      setBanks(Store.get("@banks"));
    }

    // Get banks anyway, so we can refresh whats in localstorage
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

    // Firing on mount/render only
  }, []);

  return (
    <>
      {banksChanged && (
        <SubmissionMessage
          messageType={banksChanged.type}
          dangerouslySetInnerHTML={{ __html: banksChanged.message }}
        ></SubmissionMessage>
      )}
      <div className="col col-md col-sm col-12">
        <form ref={bankForm} method="POST" onSubmit={onBankFormSubmit}>
          {banks.map((bank, index) => {
            return (
              <BankItem
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
              <BankButtonWrapper className="mr-20">
                <Button disabled={isFormPosting} type="submit">
                  {isFormPosting ? "Ndrysho..." : "Ndrysho"}
                </Button>
              </BankButtonWrapper>

              {banks?.length < 10 && (
                <BankButtonWrapper>
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
                </BankButtonWrapper>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BankList;
