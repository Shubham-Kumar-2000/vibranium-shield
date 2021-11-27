import React, { createContext, useContext, useReducer } from "react";
import AuthContext from "../Auth/AuthContext";
import RecaptaContextProvider from "../RecaptaContext";
import { PostReducer } from "./PostReducer";
import { useSnackbar } from "notistack";

const PostContext = createContext();

export default PostContext;

const initialState = {
  posts: [],
  GetError: null,
  PostError: null,
  loading: true,
};

export const GlobalPostProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { getToken } = useContext(RecaptaContextProvider);
  const {
    state: { token },
  } = useContext(AuthContext);
  const [state, dispatch] = useReducer(PostReducer, initialState);

  const getPosts = async () => {
    const reCaptaToken = await getToken();
    await fetch(`${process.env.REACT_APP_BACKEND_API}/posts`, {
      method: "GET",
      headers: {
        "x-recaptcha": reCaptaToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const data = [...response];
        dispatch({
          type: "GET",
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Something went wrong", { variant: "default" });
      });
  };

  const addPost = async (post) => {
    const reCaptaToken = await getToken();
    const POSTBODY = {
      post: {
        ...post,
      },
    };
    if (reCaptaToken) {
      const config = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-recaptcha": reCaptaToken,
        },
        body: JSON.stringify(POSTBODY),
      };
      await fetch(`${process.env.REACT_APP_BACKEND_API}/posts/add`, config)
        .then((response) => response.json())
        .then((response) => {
          console.log({ response });
          if (response.msg === "success") {
            enqueueSnackbar("Post added successfully", { variant: "default" });
            dispatch({
              type: "ADD",
              payload: [response.post],
            });
          } else {
            enqueueSnackbar("Something went wrong", { variant: "default" });
          }
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Something went wrong", { variant: "default" });
        });
    } else {
      console.log("No token");
      enqueueSnackbar("Something went wrong", { variant: "default" });
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
