import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color: "black",
      backgroundColor: "rgb(18, 18, 20)",
    },
  },
};

const plugins = [
  "ReCaptcha",
  "IP",
  "FingerPrinter",
  "Authorization",
  "Invalid-Response",
];

export default function Plugins({ handleValue, value }) {
  return (
    <Paper
      style={{
        backgroundColor: "rgb(46, 46, 46)",
        margin: "0.5rem",
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <p style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>{"Plugins*"}</p>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-checkbox-label"
          style={{ color: "white" }}
        >
          Plugins*
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={value}
          onChange={handleValue}
          input={
            <OutlinedInput
              label="Plugins"
              style={{
                color: "wheat !important",
                borderColor: "white !important",
              }}
            />
          }
          renderValue={(selected) => selected.join(" ,")}
          MenuProps={MenuProps}
        >
          {plugins.map((plug) => (
            <MenuItem key={plug} value={plug}>
              <Checkbox checked={value.indexOf(plug) > -1} />
              <ListItemText primary={plug} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
