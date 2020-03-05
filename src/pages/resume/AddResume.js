import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Grid } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateSelect from 'components/DateSelect';
import { api } from 'api';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AddResume = (props) => {
  const classes = useStyles();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    api.get("accounts/profile").then(res => {
      setAccount(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" style={{ margin: "20px 0px" }}>이력서 추가</Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>셀프 인터뷰</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'block' }}>
          <InterviewForm />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>경력 사항</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ExperienceForm />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>자격증</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <LicenseForm />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>수상 내역</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <PrizeForm />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>프로젝트</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ProjectForm />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

const InterviewForm = ({ interview, reRender, ...rest }) => {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    interview && setInputs(interview)
  })

  const submitInterview = () => {
    api.post(`selfInterviews`, inputs).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '셀프 인터뷰 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  return (
    <>
      <TextField
        onChange={e => setInputs({ ...inputs, title: e.target.value })}
        fullWidth label="Title" variant="outlined" />
      <div style={{ marginBottom: 16 }} />
      <TextField onChange={e => setInputs({ ...inputs, content: e.target.value })}
        fullWidth multiline rows="10" label="Content" variant="outlined" />
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button onClick={submitInterview} variant="contained" color="primary" style={{ marginTop: 20 }}>셀프인터뷰 추가</Button>
        </div>
    </>
  );
};


const ExperienceForm = (props) => {
  const [experience, setExperience] = useState({});

  const changeExperience = prop => event => {
    setExperience({ ...experience, [prop]: event.target.value });
  }

  const submitExperience = () => {
    api.post(`experiences`, experience).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '경력사항 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  return (
    <div style={{ flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField onChange={changeExperience("companyName")} fullWidth label="회사명" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField onChange={changeExperience("position")} fullWidth label="역할" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateSelect onChange={changeExperience("joinedAt")} fullWidth label="입사날짜" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateSelect onChange={changeExperience("retiredAt")} fullWidth label="퇴사날짜" />
        </Grid>
      </Grid>
      <div style={{ marginBottom: 16 }} />
      <TextField onChange={changeExperience("description")} fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
      <div style={{ display: 'flex', justifyContent: "flex-end" }}>
        <Button onClick={submitExperience} variant="contained" color="primary" style={{ marginTop: 20 }}>경력 추가</Button>
      </div>
    </div>
  );
};



const LicenseForm = (props) => {
  const [license, setLicense] = useState({});

  const changeLicense = prop => event => {
    setLicense({ ...license, [prop]: event.target.value });
  }

  const submitLicense = () => {
    api.post(`licenses`, license).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '자격증 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  return (
    <div style={{ flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField fullWidth onChange={changeLicense("name")} label="자격증명" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth onChange={changeLicense("institution")} label="발급 기관" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateSelect fullWidth onChange={changeLicense("issuedDate")} label="발급날짜" />
        </Grid>
      </Grid>
      <div style={{ marginBottom: 10 }} />
      <TextField onChange={changeLicense("description")} fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
      <div style={{ display: 'flex', justifyContent: "flex-end" }}>
        <Button onClick={submitLicense} variant="contained" color="primary" style={{ marginTop: 20 }}>자격증 추가</Button>
      </div>
    </div>
  );
};

const PrizeForm = (props) => {
  const [prize, setPrize] = useState({});

  const changePrize = prop => event => {
    setPrize({ ...prize, [prop]: event.target.value });
  }

  const submitPrize = () => {
    api.post(`prizes`, prize).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '수상내역 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  return (
    <div style={{ flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField fullWidth onChange={changePrize("competition")} label="대회명" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth onChange={changePrize("name")} label="상 명" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateSelect fullWidth onChange={changePrize("issuedDate")} label="수상날짜" />
        </Grid>
      </Grid>
      <div style={{ marginBottom: 10 }} />
      <TextField onChange={changePrize("description")} fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
      <div style={{ display: 'flex', justifyContent: "flex-end" }}>
        <Button onClick={submitPrize} variant="contained" color="primary" style={{ marginTop: 20 }}>수상내역 추가</Button>
      </div>
    </div>
  );
};

const ProjectForm = (props) => {
  const [project, setProject] = useState({});

  const changeProject = prop => event => {
    setProject({ ...project, [prop]: event.target.value });
  }

  const submitProject = () => {
    api.post(`projects`, project).then(res => {
      if (res.status === 201) {
        Swal.fire({
          title: '프로젝트 등록 성공!',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  return (
    <div style={{ flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField fullWidth onChange={changeProject("name")} label="프로젝트명" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth onChange={changeProject("role")} label="역할" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateSelect fullWidth onChange={changeProject("startedAt")} label="시작 날짜" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DateSelect fullWidth onChange={changeProject("endedAt")} label="끝낸 날짜" />
        </Grid>
      </Grid>
      <div style={{ marginBottom: 16 }} />
      <TextField onChange={changeProject("projectLink")} fullWidth label="프로젝트 링크" variant="outlined" />
      <div style={{ marginBottom: 16 }} />
      <TextField onChange={changeProject("description")} fullWidth multiline rows="4" label="프로젝트 설명" variant="outlined" />
      <div style={{ display: 'flex', justifyContent: "flex-end" }}>
        <Button onClick={submitProject} variant="contained" color="primary" style={{ marginTop: 20 }}>프로젝트 추가</Button>
      </div>
    </div>
  );
};

export default AddResume;
