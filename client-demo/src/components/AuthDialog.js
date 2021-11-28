import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Register from "./Register";
import Login from "./Login";
import AuthContext from "../context/Auth/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AuthDialog() {
  const { isRegistered } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [forSignUp, setForSignUp] = React.useState(isRegistered);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <li style={{ cursor: "pointer" }}>
        <div onClick={() => handleClickOpen()}>Sign In / Sign Up</div>
      </li>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{forSignUp ? "Sign Up" : "Sign In"}</DialogTitle>
        <DialogContent>{forSignUp ? <Register /> : <Login />}</DialogContent>
        <DialogActions>
          <p>
            {forSignUp ? "Already have an account?" : "Don't have an account?"}
          </p>
          <Button
            onClick={() => setForSignUp(!forSignUp)}
            variant="contained"
            style={{ marginLeft: "0.5rem" }}
            size="small"
          >
            {forSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
