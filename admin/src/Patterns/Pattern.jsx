import * as React from "react";
import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Inputs from "../InputFeilds/Inputs";
import { Typography } from "@mui/material";
import SingleSelect from "../InputFeilds/SingleSelect";

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

const data = ["userAgent", "url", "path", "domain", "ip", "method"];

export default function Pattern({
  pattern: { key, value },
  handleInvalidOptionsPattern,
}) {
  const [expanded, setExpanded] = React.useState(false);

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
          <Typography>Configure pattern </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundImage: "linear-gradient( to bottom, #1f1f1f 70%,#2f2f2f)",
          }}
        >
          <SingleSelect
            handleValue={handleInvalidOptionsPattern}
            value={key ? key : ""}
            data={data}
          />
          <Inputs
            feild={"Value"}
            value={value ? value : ""}
            handleValue={handleInvalidOptionsPattern}
            name={"value"}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
