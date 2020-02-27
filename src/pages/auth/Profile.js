import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { api } from "api";
import { Typography, TextField, Button, Paper, Avatar } from "@material-ui/core";
import TagsInput from 'react-tagsinput'
import './tagsinput.css'
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

const Profile = props => {
  const classes = useStyles();
  const [account, setAccount] = useState({});
  const [technology, setTechNology] = useState([]);
  const [tags, setTags] = useState(null);

  const handleTechChange = tech => {
    setTechNology(tech);
  }

  useEffect(() => {
    getProfile();
    getTags();
  }, []);

  const getProfile = () => {
    api.get("accounts/profile").then(res => {
      setAccount(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const getTags = () => {
    api.get("technology").then(res => {
      setTags(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const submitTech = () => {
    console.log(technology);
  }

  const submitAccount = () => {
    console.log(account);
    api.put(`accounts/${account.id}`, account).then(res => {
      Swal.fire({
        title: "수정 성공!",
        icon: "success",
        text: "회원 정보가 수정 되었습니다.",
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  const handleModify = key => event => {
    setAccount({ ...account, [key]: event.target.value });
  }

  return (
    <div className={classes.root}>
      {console.log(tags)}
      <div style={{ marginBottom: 20 }} />
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>기타 정보</Typography>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar src={account.image} style={{ alignSelf: 'center', width: 180, height: 180 }}></Avatar>
        </div>
        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: 20 }}>{account.email}</Typography>

        <TextField
          onChange={handleModify("nickName")}
          value={account.nickName}
          InputLabelProps={{ shrink: true }}
          fullWidth label="이름"
          variant="outlined" />
        <div style={{ marginBottom: 20 }} />
        <TextField
          onChange={handleModify("socialLink")}
          value={account.socialLink}
          InputLabelProps={{ shrink: true }}
          fullWidth label="소셜링크"
          variant="outlined" />
        <div style={{ marginBottom: 20 }} />
        <TextField
          onChange={handleModify("position")}
          value={account.position}
          InputLabelProps={{ shrink: true }}
          fullWidth label="직군"
          variant="outlined" />
        <div style={{ marginBottom: 20 }} />
        <TextField
          onChange={handleModify("oneLineIntroduce")}
          value={account.oneLineIntroduce}
          InputLabelProps={{ shrink: true }}
          fullWidth label="한줄소개"
          variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={() => submitAccount()} variant="contained" color="primary" style={{ marginTop: 20 }}>정보 수정</Button>
        </div>
      </Paper>

      <div style={{ marginBottom: 20 }} />
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>기술 태그</Typography>
        <TagsInput value={technology} onChange={handleTechChange} />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={() => submitTech()} variant="contained" color="primary" style={{ marginTop: 20 }}>태그 추가</Button>
        </div>
      </Paper>

      {account.email}
      {account.nickName}
      {account.favorite}
      {account.position}
      {account.userRole}
      {account.createdAt}
      {account.oneLineIntroduce}
      {account.image}
      {account.socialLink}
      {account.enterprise}
      {account.experiences}
      {account.licenses}
      {account.prizes}
      {account.projects}
      {account.selfInterviews}
    </div>
  );
};

export default Profile;
