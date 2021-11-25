import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import Loader from "react-loader-spinner";
import { Avatar, Paper } from "@mui/material";
import AuthContext from "./context/Auth/AuthContext";
import PostContext from "./context/Posts/PostContext";

const Posts = () => {
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext);

  const { posts, loading, getPosts } = useContext(PostContext);

  useEffect(() => {
    (async () => await getPosts())();
  }, []);
  return (
    <>
      <Header />

      <main>
        <div className="posts">
          <h1>Post</h1>

          {loading ? (
            <div className="loader-next">
              <Loader
                type="Bars"
                color="#00BFFF"
                height={50}
                width={50}
                timeout={3000}
              />
            </div>
          ) : (
            posts.map((post) => {
              const viewDate = new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });
              return (
                <Paper className="article" key={post.id}>
                  <Avatar
                    src={`https://avatars.dicebear.com/api/bottts/${post.id}.svg`}
                  />

                  <h4>{post.title}</h4>
                  <time dateTime={new Date()} className="postTime">
                    <p>{viewDate}</p>
                  </time>
                  <p>{post.body}</p>
                </Paper>
              );
            })
          )}
        </div>
      </main>
    </>
  );
};

export default Posts;
