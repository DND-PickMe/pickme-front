import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { AuthConsumer } from 'context/AuthContext';

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
const Resume = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>이력서 추가</Typography>
      <AuthConsumer> 
        {auth => {
          console.log(auth.state);
        }}
      </AuthConsumer>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>셀프 인터뷰</Typography>
        <TextField id="interview-title" fullWidth label="Title" variant="outlined" />
        <div style={{ marginBottom: 10 }} />
        <TextField id="interview-content" fullWidth multiline rows="10" label="Content" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>셀프인터뷰 추가</Button>
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>경력사항</Typography>
        <TextField id="experience-name" label="회사명" variant="outlined" />
        <TextField id="experience-position" label="역할" variant="outlined" />
        <TextField id="experience-join" label="입사날짜" variant="outlined" />
        <TextField id="experience-retire" label="퇴사날짜" variant="outlined" />
        <div style={{ marginBottom: 10 }} />
        <TextField id="experience-description" fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>경력 추가</Button>
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>자격증</Typography>
        <TextField id="license-name" label="자격증명" variant="outlined" />
        <TextField id="license-institution" label="발급 기관" variant="outlined" />
        <TextField id="license-date" label="발급 날짜" variant="outlined" />
        <div style={{ marginBottom: 10 }} />
        <TextField id="license-description" fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>자격증 추가</Button>
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>수상내역</Typography>
        <TextField id="prize-competition" label="대회명" variant="outlined" />
        <TextField id="prize-name" label="상 명" variant="outlined" />
        <TextField id="prize-date" label="수상날짜" variant="outlined" />
        <div style={{ marginBottom: 10 }} />
        <TextField id="prize-description" fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>수상내역 추가</Button>
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>프로젝트</Typography>
        <TextField id="project-name" label="프로젝트명" variant="outlined" />
        <TextField id="project-role" label="역할" variant="outlined" />
        <TextField id="project-startdate" label="시작 날짜" variant="outlined" />
        <TextField id="project-enddate" label="끝낸 날짜" variant="outlined" />
        <div style={{ marginBottom: 10 }} />
        <TextField id="project-description" fullWidth multiline rows="4" label="프로젝트 설명" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>프로젝트 추가</Button>
        </div>
      </Paper>
    </div >
  );
};

export default Resume;