import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import Loader from "react-loader-spinner";
import { Avatar, Paper } from "@mui/material";
import AuthContext from "./context/Auth/AuthContext";
import PostContext from "./context/Posts/PostContext";

const Posts = () => {
  const {
    state: { isAuthenticated, token },
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

          {loading && !token ? (
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
              const viewDate = new Date(post.createdAt).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              );
              return (
                <Paper className="article" key={post._id}>
                  <Avatar
                    src={`https://avatars.dicebear.com/api/bottts/${post.id}.svg`}
                  />

                  <h4>{post.title}</h4>
                  <time
                    dateTime={new Date(post.createdAt)}
                    className="postTime"
                  >
                    <p style={{ fontSize: "0.8em" }}>
                      Posted By:{" "}
                      <span style={{ fontSize: "1rem", fontWeight: "bolder" }}>
                        {post.createdBy}
                      </span>
                    </p>
                    <p style={{ fontSize: "0.7em" }}>{viewDate}</p>
                  </time>
                  <p>{post.desc}</p>
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
