import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { authReducer } from "./AuthReducer";
import Cookies from "universal-cookie";
import RecaptaContextProvider from "../RecaptaContext";
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();
  const { getToken } = useContext(RecaptaContextProvider);
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

    const token = await getToken();
    console.log({ token, body });

    if (token) {
      await fetch(`${process.env.REACT_APP_BACKEND_API}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-recaptcha": token,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          if (data.err || !data.user) {
            enqueueSnackbar(data.err, {
              variant: "error",
            });
          } else {
            dispatch({
              type: "LOGIN",
              payload: {
                isRegistered: true,
                isAuthenticated: true,
                user: data.user,
                token: data.token,
              },
            });
          }
        })
        .catch((err) => {
          console.log({ err });
          enqueueSnackbar("Something went wrong", { variant: "default" });
        });
    } else {
      console.log("No token");
      enqueueSnackbar("Something went wrong", { variant: "default" });
    }
  };

  const registerUser = async (userDetails) => {
    const body = {
      ...userDetails,
    };
    const token = await getToken();
    console.log({ token, body });
    if (token) {
      await fetch(`${process.env.REACT_APP_BACKEND_API}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-recaptcha": token,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          if (data.msg === "success") {
            enqueueSnackbar("User registered successfully", {
              variant: "success",
            });
            dispatch({
              type: "REGISTER",
            });
          }
        })
        .catch((err) => {
          console.log({ err });
          enqueueSnackbar("Something went wrong", { variant: "default" });
        });
    } else {
      enqueueSnackbar("Something went wrong", { variant: "default" });
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
