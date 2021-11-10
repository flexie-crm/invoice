import create from "zustand";

const client = {
  name: "",
  nuis: "",
  address: "",
  city: "",
  country: "",
};

const useClient = create((set) => ({
  client,
  updateClient: (client) => set((state) => ({ ...state?.client, client })),
}));

export default useClient;
