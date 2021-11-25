import React, { createContext, useContext, useReducer } from "react";
import RecaptaContextProvider from "../RecaptaContext";
import { PostReducer } from "./PostReducer";
const PostContext = createContext();

export default PostContext;

const initialState = {
  posts: [],
  GetError: null,
  PostError: null,
  loading: true,
};

export const GlobalPostProvider = ({ children }) => {
  //   const { enqueueSnackbar } = useSnackbar();
  const { reCaptaToken, getToken } = useContext(RecaptaContextProvider);
  const [state, dispatch] = useReducer(PostReducer, initialState);

  const getPosts = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "GET",
      headers: {
        "x-reCaptaV3": reCaptaToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const data = [...response];
        dispatch({
          type: "GET",
          payload: data.slice(0, 10),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPost = async (post) => {
    const token = reCaptaToken;
    if (token) {
      const config = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-reCaptaV3": token,
        },
        body: JSON.stringify(post),
      };
      await fetch(`${process.env.REACT_APP_BACKEND_API}/post`, config)
        .then((response) => response.json())
        .then((response) => {
          console.log({ response });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No token");
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        loading: state.loading,
        getPosts,
        addPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
