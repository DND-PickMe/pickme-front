import React, { useState } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import { Button, makeStyles, Paper, Grid, Hidden } from "@material-ui/core";
import PasswordInput from "components/PasswordInput";
import { api } from "api";
import Swal from 'sweetalert2';
import { PATH_SIGN_IN } from "route/paths";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  activityTab: {
    padding: 8,
    borderBottom: 'none',
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    fontWeight: 'bold',
  },
  unActivityTab: {
    padding: 8,
    borderBottom: 'none',
    backgroundColor: 'none'
  }
}));

const SignUp = props => {
  const classes = useStyles();
  const [isUser, setIsUser] = useState(true);
  const [userInputs, setUserInputs] = useState({});
  const [epInputs, setEpInputs] = useState({});
  const [vaildCode, setValidCode] = useState();
  const [visiable, setVisiable] = useState(false);

  const userChange = prop => event => {
    setUserInputs({ ...userInputs, [prop]: event.target.value });
  }

  const epChange = prop => event => {
    setEpInputs({ ...epInputs, [prop]: event.target.value });
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
        push(`<ul>${message}</ul>`));

      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        html: messages.join('\n')
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
        push(`<ul>${message}</ul>`));

      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        html: messages.join('\n')
      })
    }
  }

  return (
    <div style={{ display: "flex", marginTop: 20 }}>
      <Hidden xsDown >
        <div style={{ flex: 1 }} />
      </Hidden>
      <div style={{ flex: 2 }}>
        <Button className={isUser ? classes.activityTab : classes.unActivityTab} onClick={() => setIsUser(true)}>일반 회원</Button>
        <Button className={!isUser ? classes.activityTab : classes.unActivityTab} onClick={() => setIsUser(false)}>기업 회원</Button>
        {isUser ?
          <Paper
            style={{
              borderTopLeftRadius: 'inherit',
              padding: 30
            }}>
            <h2>일반 회원가입</h2>
            <div style={{ display: 'flex' }}>
              <TextField
                style={{ flex: 10 }}
                onChange={userChange("email")}
                label="E-mail"
                variant="outlined" />
              <Button
                style={{ marginLeft: 12, flex: 2, height: 56 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  api.post("accounts/sendCode", { email: userInputs.email }).then(res => {
                    alert("해당 이메일로 인증번호가 전송되었습니다.")
                    setVisiable(true)
                  }).catch(err => {
                    alert("서버에 문제가 있습니다. 잠시 후 다시 시도해 주세요.")
                  })
                }
                }>인증 코드 전송</Button>
            </div>
            <div style={{ marginBottom: 20 }} />
            {visiable &&
              <>
                <div style={{ display: 'flex' }}>
                  <TextField
                    style={{ flex: 10 }}
                    onChange={e => setValidCode(e.target.value)}
                    label="인증번호" variant="outlined" />
                  <Button
                    style={{ marginLeft: 12, flex: 2, height: 56 }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      api.put("accounts/matchCode", { email: userInputs.email, code: vaildCode })
                        .then(res => {
                          Swal.fire({
                            icon: 'success',
                            title: '이메일이 인증이 완료되었습니다.',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        }).catch(err => {
                          const messages = [];
                          err.response.data.map(message => messages.
                            push(`<ul>${message}</ul>`));

                          Swal.fire({
                            icon: 'error',
                            title: '인증 실패',
                            html: messages.join('\n')
                          })
                        })
                    }}
                  > 인증</Button>
                </div>
                <div style={{ marginBottom: 20 }} />
              </>
            }
            <PasswordInput label="비밀번호" onChange={userChange("password")} />
            <div style={{ marginBottom: 20 }} />
            <PasswordInput label="비밀번호 확인" labelWidth={100} onChange={userChange("passwordConfirm")} />
            <div style={{ marginBottom: 20 }} />
            <TextField onChange={userChange("nickName")} fullWidth label="이름" variant="outlined" />
            <div style={{ marginBottom: 20 }} />
            <TextField onChange={userChange("oneLineIntroduce")} fullWidth label="한줄소개" variant="outlined" />
            <div style={{ marginBottom: 20 }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleSubmitUser}>Submit</Button>
            </div>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleSubmitEp}>Submit</Button>
            </div>
          </Paper>
        }
      </div>
      <Hidden xsDown >
        <div style={{ flex: 1 }} />
      </Hidden>
    </div >

  );
};

export default SignUp;
