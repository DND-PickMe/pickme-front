import React, { useEffect, useState } from "react";
import { api } from "api";
import { Typography, Card, Avatar, Chip, Paper, Button, IconButton } from "@material-ui/core";
import { __POSITIONS } from "constants/values";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';

const Resume = (props) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    getResume();
  }, [])

  const getResume = () => {
    api.get(`accounts/${props.match.params.id}`).then(res => {
      if (res.status === 200) {
        setAccount(res.data);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const handleFavorite = () => {
    api.post(`accounts/${account.id}/favorite`).then(res => {
      setAccount(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      {account &&
        <Card elevation={1} style={{ margin: 12, padding: 30 }}>
          <Typography variant="h4">{account.nickName}</Typography>
          <Avatar src={account.image}></Avatar>
          {account.positions.map(position => {
            return (`${__POSITIONS[position]}, `)
          })}
          <div style={{ marginBottom: 10 }} />
          {account.technologies.map(tech => {
            return (<Chip style={{ marginRight: 10, marginBottom: 10 }} label={tech.name} />)
          })}
          <Typography variant="h4">{account.socialLink}</Typography>
          <Typography variant="h4">{account.oneLineIntroduce}</Typography>

          <Typography variant="h6" style={{ marginBottom: 20 }}>셀프 인터뷰</Typography>
          {account.selfInterviews.map(interview => (
            <Paper elevation={3} key={interview.id} style={{ padding: 20, marginBottom: 20 }}>
              <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{interview.title}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{interview.content}</Typography>
            </Paper>
          ))}

          <Typography variant="h6" style={{ marginBottom: 20 }}>경력사항</Typography>
          {account.experiences.map(experience => (
            <Paper elevation={3} key={experience.id} style={{ padding: 20, marginBottom: 20 }}>
              <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{experience.companyName}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{experience.position}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{experience.description}</Typography>
            </Paper>
          ))}

          <Typography variant="h6" style={{ marginBottom: 20 }}>자격증</Typography>
          {account.licenses.map(license => (
            <Paper elevation={3} key={license.id} style={{ padding: 20, marginBottom: 20 }}>
              <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{license.name}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{license.institution}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{license.description}</Typography>
            </Paper>
          ))}

          <Typography variant="h6" style={{ marginBottom: 20 }}>수상내역</Typography>
          {account.prizes.map(prize => (
            <Paper elevation={3} key={prize.id} style={{ padding: 20, marginBottom: 20 }}>
              <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{prize.name}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{prize.description}</Typography>
            </Paper>
          ))}

          <Typography variant="h6" style={{ marginBottom: 20 }}>프로젝트</Typography>
          {account.projects.map(project => (
            <Paper elevation={3} key={project.id} style={{ padding: 20, marginBottom: 20 }}>
              <Typography variant="subtitle1" style={{ marginBottom: 20 }}>{project.name}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.role}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.description}</Typography>
              <Typography variant="subtitle2" style={{ marginBottom: 20 }}>{project.projectLink}</Typography>
            </Paper>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div>
              <IconButton>
                <VisibilityIcon></VisibilityIcon>
              </IconButton>
              {`조회수 ${account.hits} 회`}
            </div>
            <div>
              <IconButton>
                {account.favoriteFlag?
                <FavoriteIcon style={{color: '#E1306C'}} onClick={handleFavorite} ></FavoriteIcon>
                :
                <FavoriteBorder onClick={handleFavorite} ></FavoriteBorder>
                }
              </IconButton>
              {`좋아요 ${account.favoriteCount} 개`}
            </div>
          </div>
        </Card>
      }
    </div>
  )
}

export default Resume;