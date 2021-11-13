import { set } from "store";
import create from "zustand";

const totals = {
  vatTotal: 0,
  totalBeforeVat: 0,
  totalAfterVat: 0,
};

const invoiceTotalCount = -1;

const useTotals = create((set) => ({
  totals,
  invoiceTotalCount,
  updateTotals: (totals) => set((state) => ({ ...state?.totals, totals })),
  updateInvoiceTotalCount: (total) =>
    set((state) => {
      state.invoiceTotalCount = total;
    }),
}));

export default useTotals;
