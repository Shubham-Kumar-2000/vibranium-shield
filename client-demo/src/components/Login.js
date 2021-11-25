import { Button } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <div style={{ width: "400px" }}>
      <input className="input-res" placeholder={"Email"} />
      <input className="input-res" placeholder={"Password "} />
      <Button
        onClick={() => console.log("Login")}
        variant="contained"
        size="small"
      >
        {"Sign In"}
      </Button>
    </div>
  );
};

export default Login;
