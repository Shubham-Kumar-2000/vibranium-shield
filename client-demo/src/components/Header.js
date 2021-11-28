import React, { useContext } from "react";
import AuthContext from "../context/Auth/AuthContext";
import AuthDialog from "./AuthDialog";
import PostDialog from "./PostDialog";

const Header = () => {
  const {
    state: { isAuthenticated, isRegistered },
    dispatch,
  } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header>
      <nav>
        <div className="navCont">
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "15%",
            }}
          >
            <li>
              <a>Posts</a>
            </li>
            {isAuthenticated && <PostDialog />}
          </ul>

          <ul>
            {(!isAuthenticated || !isRegistered) && <AuthDialog />}
            {isAuthenticated && (
              <li style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
                {" "}
                Logout{" "}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
