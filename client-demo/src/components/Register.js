import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../context/Auth/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    await registerUser(userData);
  };

  return (
    <div style={{ width: "400px" }}>
      <input
        className="input-res"
        value={userData.name}
        onChange={onChange}
        placeholder={"Name"}
        name={"name"}
      />
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
        {"Sign Up"}
      </Button>
    </div>
  );
};

export default Register;
