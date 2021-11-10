import create from "zustand";
import persist from "zustand/middleware";

const persistent = {
  currency: "LEK",
};

const useTotals = create(
  persist(
    (set) => ({
      persistent,
      updatePeristent: (totals) =>
        set((state) => ({ ...state.totals, totals })),
    }),
    { name: "persistent" }
  )
);

export default useTotals;
