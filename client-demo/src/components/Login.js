import { Button } from "@mui/material";
import React, { useContext } from "react";
import AuthContext from "../context/Auth/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    await loginUser(userData);
  };
  return (
    <div style={{ width: "400px" }}>
      <input
        className="input-res"
        value={userData.email}
        onChange={onChange}
        placeholder={"Email"}
        name={"email"}
      />
      <input
        className="input-res"
        placeholder={"Password "}
        name={"password"}
        value={userData.password}
        onChange={onChange}
        type={"password"}
      />
      <Button onClick={() => onSubmit()} variant="contained" size="small">
        {"Sign In"}
      </Button>
    </div>
  );
};

export default Login;
