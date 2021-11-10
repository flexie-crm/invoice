import create from "zustand";

const useLoader = create((set) => ({
  isFormPosting: false,
  isFormLoading: false,
  setIsFormLoading: (loading) =>
    set((state) => (state.isFormLoading = loading)),
  setIsFormPosting: (posting) =>
    set((state) => (state.isFormPosting = posting)),
}));

export default useLoader;
