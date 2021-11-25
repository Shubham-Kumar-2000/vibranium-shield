import Cookies from "universal-cookie";
const cookies = new Cookies();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      cookies.set("token", action.payload.token);
      return {
        ...state,
        isRegistered: true,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "REGISTER":
      return {
        ...state,
        isRegistered: true,
      };
    case "LOGOUT":
      cookies.remove("token");
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case "ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
    default:
      return state;
  }
};
