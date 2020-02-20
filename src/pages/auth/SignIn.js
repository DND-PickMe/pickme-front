import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent, TextField, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { api } from "../../api";
import qs from "querystring";
import { PATH_AUTH_CHECK, PATH_MAIN } from "../../route/paths";

const SignIn = props => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  const handleInputs = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSignIn = () => {
    let redirect = qs.parse(props.location.search.substr(1)).redirect || PATH_MAIN;
    api
      .post(`/login`, inputs)
      .then(res => {
        let token = res.data.jwt;
        localStorage.setItem("token", token);
        props.history.replace(`${PATH_AUTH_CHECK}?redirect=${redirect}`);
      })
      .catch(err => {
        console.log(err.response);
        setMessages(err.response.data);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        props.history.goBack();
      }}
      aria-labelledby="form-dialog-title"
    >
      <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        SignIn
      </Typography>
      <DialogContent>
        <TextField
          className={classes.field}
          autoFocus
          label="Email"
          type="email"
          name="email"
          onChange={e => handleInputs(e)}
          fullWidth
        />
        <TextField
          className={classes.field}
          label="Password"
          name="password"
          type="password"
          onChange={e => handleInputs(e)}
          fullWidth
        />
      </DialogContent>
      <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={handleSignIn}>
        {"Sign In"}
      </Button>
      <Link className={classes.button} to="/sign-up" style={{ textDecoration: "none" }}>
        <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={handleSignIn}>
          {"Sign Up"}
        </Button>
      </Link>
      </div>

    </Dialog>
  );
};

export default SignIn;

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  title: {
    margin: theme.spacing(6),
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center"
  },
  button: {
    marginTop: theme.spacing(3),
    borderRadius: "10px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
  },
}));
