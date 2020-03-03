import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { api } from "api";
import { Typography, Radio, TextField, Button, Paper, Avatar, FormControlLabel, Checkbox, RadioGroup } from "@material-ui/core";
import Swal from "sweetalert2";
import ReactTags from 'react-tag-autocomplete';
import './tags.css';
import { __POSITIONS, __CAREER } from "constants/values";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

const Profile = props => {
  const classes = useStyles();
  const [account, setAccount] = useState(null);
  const [suggestions, SetSuggestions] = useState([]);
  const [technologies, setTechNologies] = useState([]);

  useEffect(() => {
    getProfile();
    getSuggestions();
  }, []);

  const getProfile = () => {
    api.get("accounts/profile").then(res => {
      setAccount(res.data);
      setTechNologies(res.data.technologies);
    }).catch(err => {
      console.log(err);
    })
  }

  const getSuggestions = () => {
    api.get("technologies").then(res => {
      SetSuggestions(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const onDeleteTech = i => {
    const tags = technologies.slice(0)
    tags.splice(i, 1)
    setTechNologies(tags);
  }

  const onAdditionTech = tag => {
    console.log("Here", tag);

    setTechNologies(technologies.concat(tag));
  }

  const submitAccount = () => {
    const data =
    {
      email: account.email,
      nickName: account.nickName,
      oneLineIntroduce: account.oneLineIntroduce,
      socialLink: account.socialLink,
      career: account.career,
      positions: account.positions,
      technologies: technologies
    }
    console.log(data);
    

    api.put(`accounts/${account.id}`, data).then(res => {
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
    console.log(key, event.target.value);
    setAccount({ ...account, [key]: event.target.value });
  }

  const deleteResume = (id, link) => {
    api.delete(`${link}/${id}`).then(res => {
      if (res.status === 200) {
        Swal.fire({
          title: "삭제 성공",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
        setAccount(res.data.account);
      }
    }
    ).catch(err => {
      console.log(err);
    })
  }

  const positionChange = prop => event => {
    const key = event.target.value;
    const foundedIndex = account.positions.indexOf(key);
    if (foundedIndex === -1) {
      setAccount({ ...account, positions: account.positions.concat(key) })
    } else {
      account.positions.splice(foundedIndex, 1);
      setAccount({ ...account, positions: account.positions })
    }
  }

  return (
    <div className={classes.root}>
      {account &&
        <>
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
              value={account.socialLink||""}
              InputLabelProps={{ shrink: true }}
              fullWidth label="소셜링크"
              variant="outlined" />
            <div style={{ marginBottom: 20 }} />

            {Object.keys(__POSITIONS).map(key => {
              return (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      onChange={positionChange(__POSITIONS[key])}
                      checked={account.positions.includes(key)}
                      value={key}
                      color="primary"
                    />
                  }
                  label={__POSITIONS[key]}
                />
              )
            })}
            <RadioGroup aria-label="career" defaultValue="ALL" value={account.career} onChange={handleModify("career")} row>
              {Object.keys(__CAREER).map(key => {
                return (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio color="primary" />}
                    label={__CAREER[key]}
                  />
                )
              })}
            </RadioGroup>
            <div style={{ marginBottom: 20 }} />
            <TextField
              onChange={handleModify("oneLineIntroduce")}
              value={account.oneLineIntroduce}
              InputLabelProps={{ shrink: true }}
              fullWidth label="한줄소개"
              variant="outlined" />
            <Typography variant="h6" style={{ marginBottom: 20 }}>기술 태그</Typography>
            <ReactTags
              tags={technologies}
              suggestions={suggestions}
              onDelete={onDeleteTech}
              onAddition={onAdditionTech} />
            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
              <Button onClick={submitAccount} variant="contained" color="primary" style={{ marginTop: 20 }}>정보 수정</Button>
            </div>
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>셀프 인터뷰</Typography>
            {account.selfInterviews.map(interview => (
              <Paper elevation={3} key={interview.id} style={{ padding: 20, marginBottom: 20 }}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{interview.title}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{interview.content}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20 }}>수정</Button>
                  <Button onClick={() => deleteResume(interview.id, "selfInterviews")} variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>경력사항</Typography>
            {account.experiences.map(experience => (
              <Paper elevation={3} key={experience.id} style={{ padding: 20, marginBottom: 20 }}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{experience.companyName}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{experience.position}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{experience.description}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20 }}>수정</Button>
                  <Button onClick={() => deleteResume(experience.id, "experiences")} variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>자격증</Typography>
            {account.licenses.map(license => (
              <Paper elevation={3} key={license.id} style={{ padding: 20, marginBottom: 20 }}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{license.name}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{license.institution}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{license.description}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20 }}>수정</Button>
                  <Button onClick={() => deleteResume(license.id, "licenses")} variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>수상내역</Typography>
            {account.prizes.map(prize => (
              <Paper elevation={3} key={prize.id} style={{ padding: 20, marginBottom: 20 }}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{prize.name}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{prize.description}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20 }}>수정</Button>
                  <Button onClick={() => deleteResume(prize.id, "prizes")} variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>

          <Paper elevation={3} style={{ padding: 30, marginBottom: 20 }}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>프로젝트</Typography>
            {account.projects.map(project => (
              <Paper elevation={3} key={project.id} style={{ padding: 20, marginBottom: 20 }}>
                <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{project.name}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.role}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.description}</Typography>
                <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.projectLink}</Typography>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 20 }}>수정</Button>
                  <Button onClick={() => deleteResume(project.id, "projects")} variant="contained" color="secondary">삭제</Button>
                </div>
              </Paper>
            ))}
          </Paper>
        </>
      }
    </div>
  );
};

export default Profile;
