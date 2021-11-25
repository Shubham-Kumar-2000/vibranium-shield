import "./App.css";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Inputs from "./InputFeilds/Inputs";
import Plugins from "./InputFeilds/Plugins";
import AcceptedMethod from "./InputFeilds/AcceptedMethods";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./Tabs/TabPanel";
import ReCaptaConfig from "./ReCaptaConfig/ReCaptaConfig";
import InvalidResponse from "./InvalidResponses/InvalidResponse";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import Rules from "./Rules/Rules";
import { useSnackbar } from "notistack";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const today = new Date();

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [config, setConfig] = useState({
    MaxRequestLimit: 0,
    ttl: 0,
    DummyOrigin: "",
    plugins: [],
    AcceptedMethods: [],
    Authorization: undefined,
    ReCaptcha: {
      // key: "",
      // Sceret: "",
    },
    InvalidOptions: {
      keyStatus: "",
      pattern: {
        key: "",
        value: "",
      },
      value: 0,
    },
  });

  const [rules, setRules] = useState([]);
  const [tab, setTab] = useState(0);
  const [date, setDate] = useState(today);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  const handleFeild = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlugins = (e) => {
    const {
      target: { value },
    } = e;
    setConfig({
      ...config,
      plugins: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleAcceptedMethods = (e) => {
    const {
      target: { value },
    } = e;
    setConfig({
      ...config,
      AcceptedMethods: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleInvalidOptionsKeyStatus = (e) => {
    const {
      target: { value },
    } = e;
    setConfig({
      ...config,
      InvalidOptions: {
        ...config.InvalidOptions,
        keyStatus: value,
      },
    });
  };

  const handleInvalidOptionsValue = (e) => {
    const {
      target: { value: userValue },
    } = e;
    setConfig({
      ...config,
      InvalidOptions: {
        ...config.InvalidOptions,
        value: userValue,
      },
    });
  };

  const handleRecaptaChange = (e) => {
    const {
      target: { value },
    } = e;
    console.log(value, e.target.name);
    setConfig({
      ...config,
      ReCaptcha: {
        ...config.ReCaptcha,
        [e.target.name]: value,
      },
    });
  };

  const handleInvalidOptionsPattern = (e) => {
    const {
      target: { value },
    } = e;
    console.log(value, e.target.name);
    setConfig({
      ...config,
      InvalidOptions: {
        ...config.InvalidOptions,
        pattern: {
          ...config.InvalidOptions.pattern,
          [e.target.name]: value,
        },
      },
    });
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleRules = (rule) => {
    setRules(rule);
  };

  const {
    DummyOrigin,
    MaxRequestLimit,
    ttl,
    plugins,
    AcceptedMethods,
    Authorization,
    ReCaptcha,
    InvalidOptions,
  } = config;

  const handleSubmit = async () => {
    setLoading(true);
    if (
      rules.length === 0 ||
      DummyOrigin === "" ||
      MaxRequestLimit === 0 ||
      ttl === 0 ||
      plugins.length === 0 ||
      AcceptedMethods.length === 0
    ) {
      setLoading(false);
      enqueueSnackbar("Pleas, fill all the required feilds", {
        variant: "default",
      });
      return;
    }
    if (rules.length === 0) {
      setLoading(false);
      enqueueSnackbar("Please add atleast one rule", { variant: "default" });
      return;
    }
    if (plugins.length === 0) {
      setLoading(false);
      enqueueSnackbar("Please enter plugins", { variant: "default" });
      return;
    }
    if (AcceptedMethods.length === 0) {
      setLoading(false);
      enqueueSnackbar("Please enter AcceptedMethods", { variant: "default" });
      return;
    }
    if (MaxRequestLimit === 0) {
      setLoading(false);
      enqueueSnackbar("Please enter MaxRequestLimit", { variant: "default" });
      return;
    }
    if (ttl === 0) {
      setLoading(false);
      enqueueSnackbar("Please enter ttl", { variant: "default" });
      return;
    }
    if (DummyOrigin === "") {
      setLoading(false);
      enqueueSnackbar("Please enter dummy origin", { variant: "default" });
      return;
    }

    console.log(ReCaptcha);

    if (
      plugins.includes("ReCaptcha") &&
      (!ReCaptcha || !ReCaptcha.Key || !ReCaptcha.Secret)
    ) {
      setLoading(false);
      enqueueSnackbar("Please enter reCaptcha key and secret", {
        variant: "default",
      });
      return;
    }

    if (
      plugins.includes("Invalid-Response") &&
      (InvalidOptions.keyStatus.length === 0 || InvalidOptions.value === 0)
    ) {
      setLoading(false);
      enqueueSnackbar("Please enter key status and value crossponding to it.", {
        variant: "default",
      });
      return;
    }

    if (plugins.includes("Authorization") && !Authorization) {
      enqueueSnackbar("Please enter Authorization headers", {
        variant: "default",
      });
      setLoading(false);
      return;
    }

    const data = {
      ...config,
      rules,
    };

    console.log({ data });
    await fetch(`${process.env.REACT_APP_WORKER_API}`, {
      method: "POST",
      "Content-Type": "application/json",
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res === "OK") {
          enqueueSnackbar("Successfully configured", { variant: "default" });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        enqueueSnackbar("Something went wrong", { variant: "default" });
      });
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Paper
          style={{
            minHeight: "20vh",
            width: "95vw",
            backgroundImage: "linear-gradient( to bottom, #1f1f1f 70%,#0f0f0f)",
            position: "relative",
          }}
          elevation={1}
          color={"black"}
        >
          <h2
            style={{
              position: "absolute",
              color: "white",
              fontWeight: "normal",
              padding: "1rem",
            }}
          >
            Vibranium Shield
          </h2>
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "3rem",
            }}
          >
            <LoadingButton
              style={{
                backgroundColor: "rgb(46, 46, 46)",
              }}
              onClick={() => handleSubmit()}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Save
            </LoadingButton>
          </div>
          <h4
            style={{
              position: "absolute",
              color: "white",
              fontWeight: "normal",
              padding: "1rem",
              right: "0",
            }}
          >
            {date.toLocaleDateString() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds()}
          </h4>

          <div style={{ marginTop: "3rem", padding: "1rem" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tab}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Configurations" {...a11yProps(0)} />
                <Tab label="Rules*" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <p
                style={{
                  opacity: 0.8,
                  padding: "0.5rem",
                }}
              >
                *Required Feilds
              </p>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 6">
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "0.2 rem",
                    }}
                  >
                    <Plugins handleValue={handlePlugins} value={plugins} />
                    <AcceptedMethod
                      handleValue={handleAcceptedMethods}
                      value={AcceptedMethods}
                    />
                    <div
                      style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Inputs
                        feild={"Max Request Limit*"}
                        value={MaxRequestLimit}
                        handleValue={handleFeild}
                        name={"MaxRequestLimit"}
                        number
                      />
                      <Inputs
                        feild={"Time to live*"}
                        value={ttl}
                        handleValue={handleFeild}
                        name={"ttl"}
                        number
                      />
                    </div>
                    <Inputs
                      feild={"Dummy Origin*"}
                      value={DummyOrigin}
                      handleValue={handleFeild}
                      name={"DummyOrigin"}
                    />
                    {plugins.indexOf("ReCaptcha") > -1 && (
                      <ReCaptaConfig
                        ReCaptcha={ReCaptcha}
                        handleRecaptaChange={handleRecaptaChange}
                      />
                    )}
                  </div>
                </Box>
                <Box gridColumn="span 6">
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "0.2 rem",
                    }}
                  >
                    {plugins.indexOf("Invalid-Response") > -1 && (
                      <InvalidResponse
                        InvalidOptions={InvalidOptions}
                        handleInvalidOptionsKeyStatus={
                          handleInvalidOptionsKeyStatus
                        }
                        handleInvalidOptionsValue={handleInvalidOptionsValue}
                        handleInvalidOptionsPattern={
                          handleInvalidOptionsPattern
                        }
                      />
                    )}
                    {plugins.indexOf("Authorization") > -1 && (
                      <Inputs
                        feild={"Authrizaton header"}
                        value={Authorization}
                        handleValue={handleFeild}
                        name={"Authorization"}
                      />
                    )}
                  </div>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Rules rules={rules} handleRules={handleRules} />
            </TabPanel>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default App;

// Title and name
// what is VB
// teah stack, arch diagram
// demo
// gateway walk through
// testing
// future scopt
// conclusion
