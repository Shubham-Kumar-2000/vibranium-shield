import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Paper } from "@mui/material";
import RecaptaContextProvider from "../context/RecaptaContext";
import PostContext from "../context/Posts/PostContext";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function PostDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { loading, addPost } = useContext(PostContext);
  const [addPostData, setAddPostData] = useState({
    title: "",
    desc: "",
    createdBy: "",
  });

  const onChange = (e) => {
    setAddPostData({
      ...addPostData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostSubmit = async () => {
    if (
      addPostData.title === "" ||
      addPostData.desc === "" ||
      addPostData.createdBy === ""
    ) {
      enqueueSnackbar("Please fill all the fields", { variant: "default" });
      return;
    }
    await addPost(addPostData);
    handleClose();
  };

  return (
    <div>
      <li style={{ cursor: "pointer" }}>
        <div onClick={() => handleClickOpen()}>Add Post</div>
      </li>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add Your Post</DialogTitle>
        <DialogContent>
          <Paper className="addPostContainer">
            <input
              className="input-res"
              placeholder={"Title"}
              autoFocus={true}
              name={"title"}
              onChange={onChange}
              value={addPostData.title}
            />
            <textarea
              className="input-res text-area"
              placeholder={"Body"}
              name={"desc"}
              onChange={onChange}
              value={addPostData.desc}
            />
            <input
              className="input-res"
              placeholder={"Created by"}
              autoFocus={true}
              name={"createdBy"}
              onChange={onChange}
              value={addPostData.createdBy}
            />
            <div className="btnCont">
              <LoadingButton
                onClick={() => handlePostSubmit()}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                size="small"
                color="inherit"
              >
                Add Post
              </LoadingButton>
            </div>
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
