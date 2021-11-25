export const PostReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };

    case "ADD":
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload],
        error: null,
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
