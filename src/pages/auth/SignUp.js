import React, { useState } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import { Button, makeStyles, Paper, Grid } from "@material-ui/core";
import PasswordInput from "components/PasswordInput";
import { api } from "api";
import TagsInput from 'react-tagsinput'
import './tagsinput.css'
import Swal from 'sweetalert2';
import { getThemeProps } from "@material-ui/styles";
import { PATH_MAIN, PATH_SIGN_IN } from "route/paths";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  activityTab: {
    padding: 12,
    borderBottom: 'none',
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    fontWeight: 'bold',
  },
  unActivityTab: {
    padding: 12,
    borderBottom: 'none',
    backgroundColor: 'none'
  }
}));

const SignUp = props => {
  const classes = useStyles();
  const [isUser, setIsUser] = useState(true);
  const [userInputs, setUserInputs] = useState({});
  const [epInputs, setEpInputs] = useState({});
  const [technology, setTechNology] = useState([]);

  const userChange = prop => event => {
    setUserInputs({ ...userInputs, [prop]: event.target.value });
  }

  const epChange = prop => event => {
    setEpInputs({ ...epInputs, [prop]: event.target.value });
  }

  const handleTechChange = tech => {
    setTechNology(tech);
  }

  const handleSubmitUser = async () => {
    if (userInputs.password !== userInputs.passwordConfirm) {
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: '비밀번호가 같지 않습니다.'
      })
      { return }
    }


    try {
      const data = { ...userInputs };
      delete data.passwordConfirm;
      console.log(data);
      const res = await api.post("accounts", data);
      if (res.status === 201) {
        await Swal.fire({
          icon: 'success',
          title: '회원가입 성공!',
          showConfirmButton: false,
          timer: 1500
        })
        props.history.push(PATH_SIGN_IN);
      }
      
    } catch (err) {
      const messages = [];
      err.response.data.map(message => messages.
        push(`<ul><b>${message.field}</b>는 ${message.defaultMessage}</ul>`));

      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        html: messages.join('\n\n')
      })
    }
  }

  const handleSubmitEp = async () => {
    const data = { ...epInputs };
    delete data.passwordConfirm;
    console.log(data);
    try {
      const res = await api.post("enterprises", data);
      if (res.status === 201) {
        await Swal.fire({
          icon: 'success',
          title: '회원가입 성공!',
          showConfirmButton: false,
          timer: 1500
        })
        props.history.push(PATH_SIGN_IN);
      }
    } catch (err) {
      const messages = [];
      err.response.data.map(message => messages.
        push(`<ul><b>${message.field}</b>는 ${message.defaultMessage}</ul>`));

      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        html: messages.join('\n\n')
      })
    }
  }

  return (
    <Grid>
      <div style={{ marginTop: 30 }} />
      <Button className={isUser ? classes.activityTab : classes.unActivityTab} onClick={() => setIsUser(true)}>일반 회원</Button>
      <Button className={!isUser ? classes.activityTab : classes.unActivityTab} onClick={() => setIsUser(false)}>기업 회원</Button>
      {isUser ?
        <Paper elevation={3} style={{ padding: 30 }}>
          <h2>일반 회원가입</h2>
          <TextField onChange={userChange("email")} fullWidth label="E-mail" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <PasswordInput label="비밀번호" onChange={userChange("password")} />
          <div style={{ marginBottom: 20 }} />
          <PasswordInput label="비밀번호 확인" labelWidth={100} onChange={userChange("passwordConfirm")} />
          <div style={{ marginBottom: 20 }} />
          <TextField onChange={userChange("nickName")} fullWidth label="이름" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <TextField onChange={userChange("oneLineIntroduce")} fullWidth label="한줄소개" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          {/* <TextField onChange={userChange("socialLik")} fullWidth label="소셜링크" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <TextField onChange={userChange("postion")} fullWidth label="포지션" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <TagsInput value={technology} onChange={handleTechChange} /> */}
          <div style={{ marginBottom: 20 }} />
          <Button onClick={handleSubmitUser}>Submit</Button>
        </Paper>
        :
        <Paper elevation={3} style={{ padding: 30 }}>
          <h2>기업 회원가입</h2>
          <TextField onChange={epChange("email")} fullWidth label="E-mail" variant="outlined" />
          <div style={{ marginBottom: 20 }} />
          <PasswordInput label="비밀번호" onChange={epChange("password")} />
          <div style={{ marginBottom: 20 }} />
          <PasswordInput label="비밀번호 확인" labelWidth={100} onChange={epChange("passwordConfirm")} />
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
