import { Button } from "@mui/material";
import React from "react";

const Register = () => {
  return (
    <div style={{ width: "400px" }}>
      <input className="input-res" placeholder={"Name"} />
      <input className="input-res" placeholder={"Email"} />
      <input className="input-res" placeholder={"Password "} />
      <Button
        onClick={() => console.log("Register")}
        variant="contained"
        size="small"
      >
        {"Sign Up"}
      </Button>
    </div>
  );
};

export default Register;
