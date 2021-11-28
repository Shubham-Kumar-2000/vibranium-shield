import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecaptaContext } from "./context/RecaptaContext";
import { SnackbarProvider } from "notistack";
import { GlobalAuthProvider } from "./context/Auth/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
    >
      <RecaptaContext>
        <GlobalAuthProvider>
          <App />
        </GlobalAuthProvider>
      </RecaptaContext>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
