import * as React from "react";
import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Inputs from "../InputFeilds/Inputs";
import { Typography } from "@mui/material";
import Pattern from "../Patterns/Pattern";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export default function InvalidResponse({
  InvalidOptions: { keyStatus, value, pattern },
  handleInvalidOptionsKeyStatus,
  handleInvalidOptionsValue,
  handleInvalidOptionsPattern,
}) {
  const [expanded, setExpanded] = React.useState(true);

  const toggle = () => {
    setExpanded(!expanded);
  };
  return (
    <div
      style={{
        margin: "0.5rem",
        width: "100%",
      }}
    >
      <Accordion expanded={expanded} onChange={() => toggle()}>
        <AccordionSummary
          style={{
            backgroundColor: "rgb(46, 46, 46)",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Add Key Status and number of times hits allowed
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundImage: "linear-gradient( to bottom, #1f1f1f 70%,#2f2f2f)",
          }}
        >
          <Inputs
            feild={"Http Status (comma saperated)"}
            value={keyStatus}
            handleValue={handleInvalidOptionsKeyStatus}
            name={"Http Status (comma saperated)"}
          />
          <Inputs
            feild={"Value"}
            value={value}
            handleValue={handleInvalidOptionsValue}
            name={"Max value allowed to be hitted in given ttl"}
            number
          />
          <Pattern
            pattern={pattern}
            handleInvalidOptionsPattern={handleInvalidOptionsPattern}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
