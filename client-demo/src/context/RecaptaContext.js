import React, { createContext, useEffect, useReducer, useState } from "react";

const HandleReCapta = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTA_SITE_KEY}`;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const RecaptaContextProvider = createContext();

export default RecaptaContextProvider;

const initialState = {
  loading: true,
  reCaptaToken: null,
};

export const RecaptaContext = ({ children }) => {
  const [token, setToken] = useState(initialState);
  useEffect(() => {
    (async () => {
      const res = await HandleReCapta();
      getToken();
    })();
  }, []);

  const getToken = async () => {
    console.log("getToken");
    let reCaptaToken = "";
    const recapta = window.grecaptcha;
    await recapta.ready(async function () {
      await recapta
        .execute(`${process.env.REACT_APP_RECAPTA_SITE_KEY}`, {
          action: "homepage",
        })
        .then(function (token) {
          console.log("token", token);
          reCaptaToken = token;
          setToken({
            loading: false,
            reCaptaToken: token,
          });
        });
    });

    return reCaptaToken;
  };

  return (
    <RecaptaContextProvider.Provider
      value={{
        loading: token.loading,
        reCaptaToken: token.reCaptaToken,
        getToken,
      }}
    >
      {children}
    </RecaptaContextProvider.Provider>
  );
};
