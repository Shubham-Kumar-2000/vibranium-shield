import { Paper } from "@mui/material";
import React from "react";

const Inputs = ({ feild, handleValue, value, name, number, width, max }) => {
  return (
    <Paper
      style={{
        backgroundColor: "rgb(46, 46, 46)",
        margin: "0.5rem",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-start",
        width: width ? width : "100%",
        minHeight: "5vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "inherit",
        }}
      >
        <p
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            flex: 0.4,
            fontSize: "0.9rem",
            width: "100%",
          }}
        >
          {feild}
        </p>
        <input
          className="input-res"
          placeholder={`${feild}`}
          name={name}
          value={value}
          onChange={handleValue}
          type={number ? "number" : "text"}
          min={0}
          step={0.1}
        />
      </div>
    </Paper>
  );
};

export default Inputs;

// gournal
