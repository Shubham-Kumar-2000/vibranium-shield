import React, { useContext } from "react";
import AuthContext from "../context/Auth/AuthContext";
import AuthDialog from "./AuthDialog";
import PostDialog from "./PostDialog";

const Header = () => {
  const {
    state: { isAuthenticated, isRegistered },
  } = useContext(AuthContext);

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
            {!isAuthenticated && <PostDialog />}
          </ul>

          <ul>{(!isAuthenticated || !isRegistered) && <AuthDialog />}</ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
