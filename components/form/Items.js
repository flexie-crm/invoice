import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import Button from "@shared/Buttons";
import Item from "./Item";
import { parseFloatExt } from "@utilities/Form";
import useTotals from "@store/totals";
import throttle from "lodash.throttle";

const Wrapper = styled.fieldset`
  border: none;
`;

const ItemList = styled.div``;

const getProductsRequest = throttle(
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

const Items = ({ invoiceType, isCorrective, invoiceToCorrect }) => {
  // Dummy state just to trigger useEffect
  const [addItem, setAddItem] = useState(Math.random());
  const [items, setItems] = useState(() => {
    if (isCorrective) {
      return invoiceToCorrect?.payload?.items?.map((item) => {
        try {
          const itemToCorrect = JSON.parse(item.item);

          return {
            id: uuidv4(),
            itemName: itemToCorrect.__label,
            itemHidden: item.item,
            qty: item.qty,
            price: item.price,
            vatRate: vatOptions.filter((p) => p.value === item.vat_rate)[0] || {
              label: "20%",
              value: "0.20",
            },
            vat: item.vat_total,
            totalBeforeVat: item.total_before_vat,
            totalAfterVat: item.total_after_vat,
          };
        } catch (e) {
          console.warn(e);
        }

        return {
          id: uuidv4(),
          qty: "",
          price: "",
          vatRate:
            invoiceType === "export"
              ? { label: "0% Export", value: "EXPORT_OF_GOODS" }
              : { label: "20%", value: "0.20" },
          vat: 0,
          totalBeforeVat: 0,
          totalAfterVat: 0,
        };
      });
    }

    return [
      {
        id: uuidv4(),
        qty: "",
        price: "",
        vatRate:
          invoiceType === "export"
            ? { label: "0% Export", value: "EXPORT_OF_GOODS" }
            : { label: "20%", value: "0.20" },
        vat: 0,
        totalBeforeVat: 0,
        totalAfterVat: 0,
      },
    ];
  });

  const updateTotals = useTotals((state) => state.updateTotals);

  const getProducts = useCallback((inputValue) => {
    return getProductsRequest(`?__search=${inputValue}`, "FX_GET_PRODUCTS");
  }, []);

  const handleRemove = useCallback((id) => {
    setItems((items) => items.filter((item, i) => id !== item.id));
  }, []);

  const handleUpdateItem = useCallback((id, { qty, price, vatRate }) => {
    setItems((items) => {
      const calcItems = items.map((item, i) => {
        if (item.id !== id) return item;

        const calcQty = parseFloatExt(qty) || 0;
        const calcPrice = parseFloatExt(price) || 0;
        const calcBeforeVat = parseFloatExt(calcPrice * calcQty) || 0;
        const calcVat = calcBeforeVat * vatRate?.value || 0 || 0;
        const calcAfterVat = parseFloatExt(calcVat) + calcBeforeVat || 0 || 0;

        return {
          ...item,
          qty: qty || "",
          price: price || "",
          vatRate: vatRate || "0.20",
          vat: calcVat,
          totalBeforeVat: calcBeforeVat,
          totalAfterVat: calcAfterVat.toFixed(2),
        };
      });

      return calcItems;
    });
  }, []);

  useEffect(() => {
    if (items) {
      let totalAfterVat = 0;
      let totalBeforeVat = 0;
      let vatTotal = 0;

      for (const item of items) {
        totalAfterVat += parseFloatExt(item.totalAfterVat) || 0;
        totalBeforeVat += parseFloatExt(item.totalBeforeVat) || 0;
        vatTotal += parseFloatExt(item.vat) || 0;
      }

      updateTotals({
        vatTotal: (parseFloatExt(vatTotal) || 0).toFixed(2),
        totalBeforeVat: (parseFloatExt(totalBeforeVat) || 0).toFixed(2),
        totalAfterVat: (parseFloatExt(totalAfterVat) || 0).toFixed(2),
      });
    }
  }, [items]);

  useEffect(() => {
    const fieldsWrapper = document.getElementById("fields-wrapper");
    if (fieldsWrapper && items?.length > 1) {
      fieldsWrapper.scrollTop = fieldsWrapper.scrollHeight;
    }
  }, [addItem]);

  return (
    <Wrapper>
      <ItemList>
        {items.map((item, index) => {
          return (
            <Item
              isCorrective={isCorrective}
              invoiceType={invoiceType}
              products={getProducts}
              item={item}
              onRemove={handleRemove}
              onChange={handleUpdateItem}
              key={item.id}
              index={index}
            />
          );
        })}
        <Button
          className="mt-10"
          type="button"
          quaternary
          wide
          onClick={() => {
            setItems([
              ...items,
              {
                id: uuidv4(),
                qty: "",
                price: "",
                vatRate:
                  invoiceType === "export"
                    ? { label: "0% Export", value: "EXPORT_OF_GOODS" }
                    : { label: "20%", value: "0.20" },
                vat: 0,
                totalBeforeVat: 0,
                totalAfterVat: 0,
              },
            ]);

            setAddItem(Math.random());
          }}
        >
          + Shto Artikull
        </Button>
      </ItemList>
    </Wrapper>
  );
};

export default React.memo(Items);
