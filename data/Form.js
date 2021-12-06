import * as Yup from "yup";

export const tcrValidation = Yup.object().shape({
  tcr_operation: Yup.string().required("- Duhet zgjedhur."),
  tcr_total: Yup.number().required("- duhet vendosur."),
  currency_rate: Yup.number().when("currency", {
    is: (currency) => currency !== "ALL",
    then: Yup.number().required("- duhet vendosur."),
  }),
});

export const banksValidation = Yup.object().shape({
  banks: Yup.array().of(
    Yup.object().shape({
      bank: Yup.string().required("?"),
      iban: Yup.string().required("?"),
      currency: Yup.string().required("?"),
      swift: Yup.string().required("?"),
    })
  ),
});

export const resetPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .required("- Vendos fjalekalimin e ri.")
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z]).{8,50}$/,
      "- Duhet min 8 shkronja kombinuar me numra."
    ),
  repeatPassword: Yup.string()
    .required("- Vendos fjalekalimin perseri.")
    .oneOf([Yup.ref("password"), null], "- Duhet i njejte me fjalekalimin."),
});

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("- Email jo i sakte.")
    .required("- Vendos emailin."),
  password: Yup.string().required("- Vendos flalekalimin."),
});

export const invoiceValidation = Yup.object().shape({
  client: Yup.string().when("invoice_type", {
    is: "b2b",
    then: Yup.string().required("- Zgjidhni klientin per faturen B2B."),
  }),

  address: Yup.string().when("invoice_type", {
    is: "b2b",
    then: Yup.string().required("- duhet vendosur."),
  }),

  city: Yup.string().when("invoice_type", {
    is: "b2b",
    then: Yup.string().required("- duhet vendosur."),
  }),

  country: Yup.string().when("invoice_type", {
    is: "b2b",
    then: Yup.string().required("- duhet vendosur."),
  }),

  nuis: Yup.string()
    .when("invoice_type", {
      is: "b2b",
      then: Yup.string().required("- duhet vendosur."),
    })
    .when(["invoice_type", "country"], {
      is: (invoice_type, country) =>
        invoice_type === "b2b" && (country === "ALB" || !country),
      then: Yup.string()
        .matches(
          /^[a-zA-Z](.*[a-zA-Z])?$/,
          "- duhet te filloj dhe mbaroje me nje Shkronje."
        )
        .min(10, "- duhet me 2 Shkronja dhe 8 Numra.")
        .max(10, "- duhet me 2 Shkronja dhe 8 Numra."),
    }),

  items: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required("?"),
      qty: Yup.number().typeError("?").required("?"),
      price: Yup.number().typeError("?").required("?"),
    })
  ),
  currency_rate: Yup.number().when("currency", {
    is: (currency) => currency !== "ALL",
    then: Yup.number().required("- duhet vendosur."),
  }),
  bank: Yup.string().when("payment_method", {
    is: (payment_method, invoice_type) =>
      payment_method === "ACCOUNT" && invoice_type === "b2b",
    then: Yup.string().required("- duhet vendosur"),
  }),
});
