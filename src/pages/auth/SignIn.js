import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { api } from "../../api";

const SignIn = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleInputs = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSignIn = () => {
    api
      .post(`/login`, inputs)
      .then(res => {
        let token = res.data.jwt;
        localStorage.setItem("token", token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <div>
      <button className={classes.button} onClick={openDialog}>
        {props.title}
      </button>
      <Dialog
        onClose={closeDialog}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.title}>
          <p> SignIn </p>
        </div>
        <DialogContent>
          <TextField
            className={classes.field}
            autoFocus
            label="Email Address"
            type="email"
            name="email"
            onChange={e => handleInputs(e)}
          />
          <TextField
            className={classes.field}
            label="Password"
            name="password"
            type="password"
            onChange={e => handleInputs(e)}
          />
        </DialogContent>
        <button className={classes.signIn} onClick={handleSignIn}>
          {" "}
          Sign In{" "}
        </button>{" "}
        <br />
        <div className={classes.signUp}>
          or <br />
          <Link to="/sign-up"> SignUp </Link>
        </div>
      </Dialog>
    </div>
  );
};

export default SignIn;

const useStyles = makeStyles({
  button: {
    marginTop: "35px",
    marginLeft: "310px",
    backgroundColor: "#3A68F9",
    borderRadius: "30px",
    width: "380px",
    height: "100px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  dialog: {
    width: "660px",
    height: "600px"
  },
  field: {
    width: "550px"
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: "46px",
    fontWeight: "bold",
    fontStyle: "normal",
    marginLeft: "230px",
    margin: "70px"
  },
  signIn: {
    width: "550px",
    height: "64px",
    margin: "auto",
    backgroundColor: "#3A68F9",
    borderRadius: "10px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "32px",
    color: "#FFFFFF"
  },
  signUp: {
    marginBottom: "50px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "32px",
    textAlign: "center"
  }
});
