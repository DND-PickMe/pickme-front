import React, { useState } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import { Button, makeStyles, Paper, Grid } from "@material-ui/core";
import PasswordInput from "components/PasswordInput";
import { api } from "api";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
    activityTab: {
      borderBottom: 'none',
      backgroundColor: 'white',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      fontWeight: 'bold',
    },
    unActivityTab: {
      borderBottom: 'none',
      backgroundColor: 'none'
    }
}));

const SignUp = () => {
  const classes = useStyles();
  const [isUser, setIsUser] = useState(true);
  const [userInputs, setUserInputs] = useState({});
  const [epInputs, setEpInputs] = useState({});

  const userChange = prop => event => {
    setUserInputs({ ...userInputs, [prop]: event.target.value });
  }

  const epChange = prop => event => {
    setEpInputs({ ...epInputs, [prop]: event.target.value });
  }

  const handleSubmitUser = async () => {
    try {
      const res = await api.post("accounts", userInputs);
      if (res.status===201) {
        alert("success");
      }
    } catch (err) {
      alert("err\n", err);
    }
  }

  const handleSubmitEp = async () => {
    try {
      const res = await api.post("enterprises", epInputs);
      if (res.status===201) {
        alert("success");
      }
    } catch (err) {
      alert("err\n", err);
    }
  }

  return (
    <Grid>
      <Button className={isUser?classes.activityTab:classes.unActivityTab} onClick={() => setIsUser(true)}>일반 회원</Button>
      <Button className={!isUser?classes.activityTab:classes.unActivityTab} onClick={() => setIsUser(false)}>기업 회원</Button>
      {isUser ?
        <Paper elevation={3} style={{ padding: 30 }}>
          <h2>일반 회원가입</h2>
          <TextField onChange={userChange("email")} fullWidth label="E-mail" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <PasswordInput onChange={userChange("password")} />
          <div style={{ marginBottom: 20 }} />
          {/*<PasswordInput onChange={handleChange("password2")}/>*/}
          {/*<div style={{ marginBottom: 20 }} />*/}
          <TextField onChange={userChange("nickName")} fullWidth label="닉네임" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <TextField onChange={userChange("oneLineIntroduce")} fullWidth label="한줄소개" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <Button onClick={() => handleSubmitUser}>Submit</Button>
        </Paper>
        :
        <Paper elevation={3} style={{ padding: 30 }}>
          <h2>기업 회원가입</h2>
          <TextField onChange={epChange("email")} fullWidth label="E-mail" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <PasswordInput onChange={epChange("password")} />
          <div style={{ marginBottom: 20 }} />
          <TextField onChange={epChange("registrationNumber")} fullWidth label="사업자번호" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <TextField onChange={epChange("name")} fullWidth label="회사명" variant="outlined" />
          <div style={{ marginBottom: 20 }} />        
          <TextField onChange={epChange("address")} fullWidth label="회사 주소" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <TextField onChange={epChange("ceoName")} fullWidth label="대표명" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <Button onClick={handleSubmitEp}>Submit</Button>
        </Paper>
      }

    </Grid>

  );
};

export default SignUp;
