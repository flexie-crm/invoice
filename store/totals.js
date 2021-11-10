import create from "zustand";

const totals = {
  vatTotal: 0,
  totalBeforeVat: 0,
  totalAfterVat: 0,
};

const useTotals = create((set) => ({
  totals,
  updateTotals: (totals) => set((state) => ({ ...state?.totals, totals })),
}));

export default useTotals;
