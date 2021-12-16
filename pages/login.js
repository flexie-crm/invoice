import React, { useEffect, useState } from "react";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import Head from "next/head";
import Input from "@components/Input";
import Button from "@shared/Buttons";
import Router from "next/router";
import { loginValidation } from "@data/Form";
import useValidation from "@store/validations";
import useLoader from "@store/loaders";
import { ExplainError } from "@shared/SharedStyle";

const LoginWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: 0.7rem;
  padding-right: 0.7rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 80px);

  .grid {
    margin: 0;
  }

  .login-col {
    max-width: 40rem;
  }
`;

const LoginError = styled.div`
  ${ExplainError}
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    padding: 0.8rem 1.3rem;
  }
`;

export default function Login({ csrfToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const setErrors = useValidation((state) => state.setErrors);
  const removeErrors = useValidation((state) => state.removeErrors);
  const isFormPosting = useLoader((state) => state.isFormPosting);
  const { setIsFormPosting } = useLoader((state) => ({
    setIsFormPosting: state.setIsFormPosting,
  }));

  const { emailError, passwordError } = useValidation(
    (state) => ({
      emailError: state.errors?.email,
      passwordError: state.errors?.password,
    }),
    shallow
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginValidation.validate(
        { email, password },
        {
          abortEarly: false,
        }
      );

      setIsFormPosting(true);
      const { error, url } = await signIn("flexie-auth", {
        email,
        password,
        redirect: false,
      });

      if (error) {
        setIsFormPosting(false);
        setErrorLogin(error);
      } else {
        // window.location.href = url;
        Router.push(url);
      }
    } catch (errors) {
      // Just in case set it to false here too
      setIsFormPosting(false);

      let addErrors = {};
      errors.inner.map((err) => {
        addErrors = { ...addErrors, [err.path]: err.message };
      });

      setErrors(addErrors);
    }
  };

  useEffect(() => {
    // On UnMount remove isFormPosting
    return () => setIsFormPosting(false);
  }, []);

  useEffect(() => {
    removeErrors(["email"]);
  }, [email]);

  useEffect(() => {
    removeErrors(["password"]);
  }, [password]);

  return (
    <>
      <Head>
        <title>Fatura Login | Flexie CRM</title>
      </Head>
      <LoginWrapper>
        <div className="grid grid-center">
          <div className="col col-6 col-top col-sm col-md login-col">
            {errorLogin && (
              <LoginError>
                <p>{errorLogin}</p>
              </LoginError>
            )}
            <form method="POST">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Input
                label="Email juaj"
                type="email"
                name="email"
                autoFocus
                placeholder="une@puna-ime.al"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                valid={!emailError}
                errorMessage={emailError}
              />

              <div className="mt-15">
                <Input
                  label="Fjalekalimi"
                  type="password"
                  name="password"
                  placeholder="Vendos Fjalekalimin"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  valid={!passwordError}
                  errorMessage={passwordError}
                />
              </div>

              <LoginButtonWrapper className="mt-15">
                <Button disabled={isFormPosting} onClick={handleLogin}>
                  {isFormPosting ? "Hyrja..." : "Hyrja"}
                </Button>
              </LoginButtonWrapper>
            </form>
          </div>
        </div>
      </LoginWrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
