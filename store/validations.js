import create from "zustand";

const useValidation = create((set) => ({
  hasErrors: false,
  errors: {},
  setHasError: (hasError) => set((state) => (state.hasError = hasError)),
  setErrors: (errors) => set((state) => ({ ...state.errors, errors })),
  removeErrors: (keys) =>
    set((state) => ({
      errors: Object.keys(state.errors)
        .filter((currentKey) => !keys.includes(currentKey))
        .reduce((obj, currentKey) => {
          obj[currentKey] = state.errors[currentKey];
          return obj;
        }, {}),
    })),
  removeError: (key) =>
    set((state) => ({
      errors: Object.keys(state.errors)
        .filter((currentKey) => currentKey !== key)
        .reduce((obj, currentKey) => {
          obj[currentKey] = state.errors[currentKey];
          return obj;
        }, {}),
    })),
}));

export default useValidation;
