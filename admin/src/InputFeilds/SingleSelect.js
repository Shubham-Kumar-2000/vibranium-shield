//userAgent // url // path // domain // ip // method
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Paper } from "@mui/material";

export default function SingleSelect({ value, handleValue, data }) {
  return (
    <Paper
      style={{
        backgroundColor: "rgba(46, 46, 46)",
        margin: "0.5rem",
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
      elevation={0}
    >
      <p style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        {"Patten key"}
      </p>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
          Pattern Key
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={"Patten key"}
          onChange={handleValue}
          name={"key"}
        >
          {data.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
