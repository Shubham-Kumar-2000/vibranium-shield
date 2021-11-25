export const ReacptaReducer = (state, action) => {
  switch (action.type) {
    case "GET_TOKEN":
      return {
        ...state,
        loading: false,
        getToken: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        loading: false,
        setToken: action.payload,
      };
  }
};
