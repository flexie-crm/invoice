import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import shallow from "zustand/shallow";

import Input from "@components/Input";
import { DeleteButton } from "@shared/Buttons";
import AsyncSelectBox from "@components/AsyncSelectBox";
import SelectBox from "@components/SyncSelectBox";
import useValidation from "@store/validations";
import useClient from "@store/client";

const Wrapper = styled.div`
  @media only screen and (max-width: 600px) {
    .disabled-button {
      display: none;
    }

    .disabled-button-wrapper {
      height: 20px;
    }
  }
`;

const vatOptions = [
  { label: "20%", value: "0.20" },
  { label: "10%", value: "0.10" },
  { label: "6%", value: "0.06" },
  { label: "0% Z-VAT", value: "0.00" },
  { label: "0% Tipi 1", value: "TYPE_1" },
  { label: "0% Tipi 2", value: "TYPE_2" },
  { label: "0% Margin", value: "MARGIN_SCHEME" },
  { label: "0% Export", value: "EXPORT_OF_GOODS" },
];

const Item = ({ index, onRemove, onChange, item, products }) => {
  const qtyInput = useRef();
  const vatInput = useRef();
  const [itemState, setItemState] = useState();
  const clientCountry = useClient((state) => state.client.country, shallow);

  // These objects from errors would make it possibe using shallow
  // to not rerender all items due to change on remove below
  const { itemError, qtyError, priceError } = useValidation(
    (state) => ({
      itemError: state.errors?.[`items[${index}].item`],
      qtyError: state.errors?.[`items[${index}].qty`],
      priceError: state.errors?.[`items[${index}].price`],
    }),
    shallow
  );

  const removeErrors = useValidation((state) => state.removeErrors);
  const handleOnChangeCallback = (name, value, options) => {
    try {
      const item = JSON.parse(value?.value || "{}");
      setItemState({
        ...itemState,
        [`items[${index}][price]`]: item?.base_price || "",
        [`items[${index}][vat_rate]`]:
          clientCountry?.length > 0 && clientCountry !== "ALB"
            ? "EXPORT_OF_GOODS"
            : item?.vat_rate || "",
      });

      removeErrors([
        `items[${index}].price`,
        `items[${index}].qty`,
        `items[${index}].item`,
      ]);
    } catch (e) {
      // Probably a new created product and the value is not JSON
      // So just do nothing here
    }

    // Focus on Qty, so use would set quantity right away
    qtyInput.current.focus();
  };

  const handleVatOnChange = (name, value, options) => {
    setItemState({
      ...itemState,
      [`items[${index}][vat_rate]`]: value?.value || 0,
    });
  };

  const handleItemOnChange = (e) => {
    setItemState({
      ...itemState,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveItem = () => {
    onRemove(item.id);
  };

  useEffect(() => {
    const qty = itemState?.[`items[${index}][qty]`] || 0;
    const price = itemState?.[`items[${index}][price]`] || 0;
    const vatRate = itemState?.[`items[${index}][vat_rate]`] || "0.20";

    if (itemState) {
      onChange(item.id, {
        qty: qty,
        price: price,
        vatRate: vatOptions.find((item, i) => vatRate == item.value),
      });
    }
  }, [itemState]);

  return (
    <Wrapper>
      <div className="grid">
        <div className="col col-md col-sm mb-10">
          <AsyncSelectBox
            isCreatable={true}
            hideLabels={index > 0}
            label="Produkti ose Sherbimi"
            name={`items[${index}][item]`}
            placeholder="Kerko ose Shto"
            options={products}
            onChangeCallback={handleOnChangeCallback}
            valid={!itemError}
            errorMessage={itemError}
          />
        </div>

        <div className="col col-1 col-md col-sm mb-10">
          <Input
            label="Sasia"
            type="number"
            name={`items[${index}][qty]`}
            ref={qtyInput}
            hideLabels={index > 0}
            value={item?.qty}
            onChange={handleItemOnChange}
            placeholder="0"
            valid={!qtyError}
            errorMessage={qtyError}
          />
        </div>

        <div className="col col-2 col-md col-sm mb-10">
          <Input
            label="Cmimi"
            type="number"
            name={`items[${index}][price]`}
            hideLabels={index > 0}
            value={item?.price}
            onChange={handleItemOnChange}
            placeholder="0.00"
            valid={!priceError}
            errorMessage={priceError}
          />
        </div>

        <div className="col col-2 col-md col-sm mb-10">
          <SelectBox
            ref={vatInput}
            hideLabels={index > 0}
            label="TVSH"
            options={vatOptions}
            name={`items[${index}][vat_rate]`}
            onChangeCallback={handleVatOnChange}
            value={item?.vatRate}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            valid={true}
          />
        </div>

        <div className="col col-2 col-md col-sm mb-10">
          <Input
            label="Totali me TVSH"
            type="number"
            name={`items[${index}][total]`}
            hideLabels={index > 0}
            value={item?.totalAfterVat}
            onChange={() => {}}
            readOnly
            placeholder="0.00"
            valid={true}
          />
        </div>
        <div
          className={`col col-1 col-md col-sm mb-10${
            index == 0 ? " disabled-button-wrapper" : ""
          }`}
          style={{ flex: "0 0 auto" }}
        >
          <DeleteButton
            disabled={index == 0}
            type="button"
            className={`pb-10${index == 0 ? " mt-20 disabled-button" : ""}`}
            onClick={handleRemoveItem}
          />
        </div>

        {/* Add all hidden fields here, so we can track all the missing parts without showing to the end user not needed fields*/}
        <Input
          hideLabels={true}
          type="hidden"
          name={`items[${index}][vat]`}
          value={item?.vat}
          readOnly
        />
        <Input
          hideLabels={true}
          type="hidden"
          name={`items[${index}][item_total_without_vat]`}
          value={item?.totalBeforeVat}
        />
        <Input
          hideLabels={true}
          type="hidden"
          name={`items[${index}][item_total_with_vat]`}
          value={item?.totalAfterVat}
        />
      </div>
    </Wrapper>
  );
};

export default React.memo(Item);
