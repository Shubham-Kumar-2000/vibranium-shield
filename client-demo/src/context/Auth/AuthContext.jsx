import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { authReducer } from "./AuthReducer";
import Cookies from "universal-cookie";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
const cookies = new Cookies();

const AuthContext = createContext();
export default AuthContext;

const initialState = {
  isRegistered: false,
  isAuthenticated: false,
  user: null,
  token: null,
  loginError: null,
};

export const GlobalAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    const token = cookies.get("token") || null;
    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          isRegistered: true,
          isAuthenticated: true,
          user,
          token,
        },
      });
    }
  }, []);

  const loginUser = async (userDetails) => {
    const body = {
      ...userDetails,
    };

    // const token = await validateRequest();
    // if (token) {
    //   await fetch(`${process.env.REACT_APP_BACKEND_API}/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-reCaptaV3": token,
    //     },
    //     body: JSON.stringify(body),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log({ data });
    //     })
    //     .catch((err) => {
    //       console.log({ err });
    //     });
    // } else {
    //   console.log("No token");
    // }
  };

  const registerUser = async (userDetails) => {
    const body = {
      ...userDetails,
    };
    const token = "";
    if (token) {
      // await fetch(`${process.env.REACT_APP_BACKEND_API}/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-reCaptaV3": token,
      //   },
      //   body: JSON.stringify(body),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log({ data });
      //   })
      //   .catch((err) => {
      //     console.log({ err });
      //   });
    } else {
      console.log("No token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        loginUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
