import React, { useState } from "react";
import { Button, Chip, IconButton, Paper } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Inputs from "../InputFeilds/Inputs";
import Pattern from "../Patterns/Pattern";

const RULES = [
  "Rate",
  "ReCaptcha-limit",
  "ReCaptcha-range",
  "Auth-accept",
  "Pattern",
  "Reject-Bot",
];

const Rules = ({ rules, handleRules }) => {
  const [rejectBot, setRejectBot] = useState({
    type: "Reject-Bot",
    pattern: {
      key: "",
      value: "",
    },
  });

  const [authAccepted, setAuthAccepted] = useState({
    type: "Auth-accept",
    pattern: {
      key: "",
      value: "",
    },
  });

  const handleRemove = (index) => {
    const newList = rules.filter((_, i) => i !== index);
    handleRules(newList);
  };
  const handleChipClick = (val) => {
    const data = {
      type: val,
      pattern: {
        key: "",
        value: "",
      },
    };
    if (val === "Auth-accept") {
      handleAuthAcceptedChange();
    } else if (val === "Reject-Bot") {
      handleRejectBotChange();
    } else {
      handleRules([...rules, data]);
    }
  };

  const handleRateChange = (e, index) => {
    const {
      target: { value },
    } = e;
    console.log(value, e.target.name);

    let newList = [...rules];
    newList[index] = {
      ...newList[index],
      value: parseInt(value),
    };
    handleRules(newList);
  };

  const handleRecaptaChange = (e, index) => {
    const {
      target: { value },
    } = e;
    console.log(value, e.target.name);

    let newList = [...rules];
    newList[index] = {
      ...newList[index],
      value: value ? parseFloat(value) : 0,
    };
    handleRules(newList);
  };

  const handlePatternChange = (e, index) => {
    const {
      target: { value },
    } = e;
    console.log(value, e.target.name);

    let newRules = rules;
    newRules[index] = {
      ...newRules[index],
      server: value,
    };
    handleRules(newRules);
  };

  const handleAuthAcceptedChange = (e) => {
    handleRules([...rules, authAccepted]);
  };

  const handleRejectBotChange = (e) => {
    handleRules([...rules, rejectBot]);
  };

  const handleRecaptaRangeChange = (e, index) => {
    const {
      target: { value },
    } = e;
    console.log(value, e.target.name);

    let newList = [...rules];
    newList[index] = {
      ...newList[index],
      [e.target.name]:
        e.target.name === "value" ? parseInt(value) : parseFloat(value),
    };
    handleRules(newList);
  };

  const handlePatChange = (e, index) => {
    const {
      target: { value },
    } = e;
    console.log(value, e.target.name);

    let newList = [...rules];
    newList[index] = {
      ...newList[index],
      pattern: {
        ...newList[index].pattern,
        [e.target.name]: value,
      },
    };
    handleRules(newList);
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "20vh",
        paddingBottom: "7rem",
        paddingTop: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            opacity: 0.8,
            padding: "0.5rem",
          }}
        >
          *Select the rule for your middleware:
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          {RULES.map((val, index) => (
            <Chip
              key={index}
              label={val}
              variant="outlined"
              onClick={() => handleChipClick(val)}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {rules?.map((item, index) => (
          <Paper
            sx={{
              width: "55%",
              margin: "1rem",
              backgroundColor: "rgba(46, 46, 46, 0.5)",
              padding: 0,
              position: "relative",
            }}
            elevation={0}
            key={index}
          >
            <IconButton
              style={{
                position: "absolute",
                right: "-0.1rem",
                top: "-0.5rem",
                backgroundColor: "blue",
                height: "1.3rem",
                width: "1.3rem",
              }}
              onClick={() => {
                handleRemove(index);
              }}
            >
              <DeleteOutlineIcon
                style={{
                  backgroundColor: "transparent",
                  color: "black !important",
                }}
                fontSize="small"
              />
            </IconButton>

            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                  {"Selected Rule: " + item.type}
                </p>
              </div>
              {(item.type === "Auth-accept" || item.type === "Reject-Bot") && (
                <p style={{ padding: "1rem", opacity: 0.8 }}>*Rule Added</p>
              )}
              {item.type === "Rate" && (
                <Inputs
                  feild={"value"}
                  name={"value"}
                  value={rules[index].value}
                  handleValue={(e) => handleRateChange(e, index)}
                  number
                />
              )}
              {item.type === "ReCaptcha-limit" && (
                <Inputs
                  feild={"value"}
                  name={"value"}
                  value={rules[index].value}
                  handleValue={(e) => handleRecaptaChange(e, index)}
                  number
                />
              )}
              {item.type === "Pattern" && (
                <Inputs
                  feild={"server"}
                  name={"server"}
                  value={rules[index].server}
                  handleValue={(e) => handlePatternChange(e, index)}
                />
              )}
              {item.type === "ReCaptcha-range" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Inputs
                    feild={"min(0 - 1)"}
                    name={"min"}
                    max={1}
                    value={rules[index].min}
                    handleValue={(e) => handleRecaptaRangeChange(e, index)}
                    number
                  />
                  <Inputs
                    feild={"max(0 - 1)"}
                    name={"max"}
                    max={1}
                    value={rules[index].max}
                    handleValue={(e) => handleRecaptaRangeChange(e, index)}
                    number
                  />
                  <Inputs
                    feild={"value"}
                    name={"value"}
                    value={rules[index].value}
                    handleValue={(e) => handleRecaptaRangeChange(e, index)}
                    number
                  />
                </div>
              )}
              <Pattern
                pattern={rules[index].pattern}
                handleInvalidOptionsPattern={(e) => handlePatChange(e, index)}
              />
            </CardContent>
          </Paper>
        ))}
      </div>
      <Button onClick={() => console.log({ rules })}>Print</Button>
    </div>
  );
};

export default Rules;
// https://juspay.shubhamgeek.xyz/
