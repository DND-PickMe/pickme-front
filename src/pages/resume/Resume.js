import React, { useEffect, useState } from "react";
import { api } from "api";
import { Typography, Card, Avatar, Chip, Paper, Button, IconButton } from "@material-ui/core";
import { __POSITIONS } from "constants/values";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { AuthConsumer } from "context/AuthContext";
import Swal from "sweetalert2";
import InterviewStepper from "components/stepper/InterviewStepper";
import ExperienceStepper from "components/stepper/ExperienceStepper";
import LicenseStepper from "components/stepper/LicenseStepper";
import ProjectStepper from "components/stepper/ProjectStepper";
import PrizeStepper from "components/stepper/PrizeStepper";

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
    <div style={{ textAlign: "center" }}>
      {account &&
        <Card elevation={1} style={{ margin: 12, padding: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              style={{ width: 200, height: 200 }}
              src={account.image} />
          </div>
          <Typography variant="h4">{account.nickName}</Typography>
          {account.positions.map(position => __POSITIONS[position]).join(', ')}
          <Typography
            style={{ padding: 30 }}
            variant="h4">{account.oneLineIntroduce}</Typography>
          <div style={{ marginBottom: 10 }} />
          {account.technologies.map(tech => {
            return (<Chip style={{ marginRight: 10, marginBottom: 10 }} label={tech.name} />)
          })}
          <a href={account.socialLink}><p>{account.socialLink}</p></a>

          <div style={{ textAlign: 'left' }} >

            <Paper elevation={3} style={{ padding: 30 }}>
              <Typography variant="h6" style={{ marginBottom: 20 }}>셀프인터뷰</Typography>
              <InterviewStepper items={account.selfInterviews} />
            </Paper>

            <Paper elevation={3} style={{ padding: 30 }}>
              <Typography variant="h6" style={{ marginBottom: 20 }}>경력</Typography>
              <ExperienceStepper items={account.experiences} />
            </Paper>

            <Paper elevation={3} style={{ padding: 30 }}>
              <Typography variant="h6" style={{ marginBottom: 20 }}>자격증</Typography>
              <LicenseStepper items={account.licenses} />
            </Paper>

            <Paper elevation={3} style={{ padding: 30 }}>
              <Typography variant="h6" style={{ marginBottom: 20 }}>수상내역</Typography>
              <PrizeStepper items={account.prizes} />
            </Paper>

            <Paper elevation={3} style={{ padding: 30 }}>
              <Typography variant="h6" style={{ marginBottom: 20 }}>프로젝트</Typography>
              <ProjectStepper items={account.projects} />
            </Paper>

          </div>

          <AuthConsumer>
            {auth =>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  if (auth.state.user.userRole === "USER") {
                    Swal.fire({
                      icon: 'error',
                      title: '권한이 없습니다!',
                      text: '일반 사용자는 제안하기를 할 수 없습니다.'
                    })
                  } else {
                    api.get(`enterprises/suggestion?accountId=${account.id}`).
                      then(res => {
                        Swal.fire({
                          icon: 'success',
                          title: '제안 성공!',
                          text: '구직자에게 채용 제안 이메일을 전송했습니다.',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }).catch(err => {
                        Swal.fire({
                          icon: 'error',
                          title: '서버에 문제가 있습니다.',
                          text: '잠시 후 다시 시도해 주세요.',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      })
                  }
                }}>제안 하기</Button>
            }
          </AuthConsumer>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div>
              <IconButton>
                <VisibilityIcon></VisibilityIcon>
              </IconButton>
              {`조회수 ${account.hits} 회`}
            </div>
            <div>
              <IconButton>
                {account.favoriteFlag ?
                  <FavoriteIcon style={{ color: '#E1306C' }} onClick={handleFavorite} ></FavoriteIcon>
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