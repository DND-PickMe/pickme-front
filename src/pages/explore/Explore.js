import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Card, Avatar, Chip, CardContent } from "@material-ui/core"
import { api } from "api";
import { __POSITIONS } from "constants/values";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 240,
  },
}));


const Explore = props => {
  let loadable = true;
  let isLoading = false;
  let loadUrl = 'accounts';
  const classes = useStyles();
  const [target, setTarget] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const getAccounts = async () => {
    isLoading = true

    try {
      const res = await api.get(loadUrl);
      if (res.status === 200) {
        const responseData = res.data._embedded.accountResponseDtoList
        console.log(accounts);
        
        if (accounts === null) {
          console.log("처음 로딩");
          setAccounts(responseData)
        } else {
          console.log("나중 로딩");
          setAccounts(accounts.concat(responseData))
        }
        if (res.data._links.next) {
          console.log("more data");
          loadUrl = res.data._links.next.href
          loadUrl = loadUrl.replace("http", "https")
          loadable = true
        } else {
          console.log("no more data");
          loadable = false
        }

        isLoading = false;
      }
    } catch (err) {
      loadable = false;
      console.log(err);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const handleIntersection = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      if (loadable && !isLoading) {
        console.log("load data");
        await getAccounts();
      }
      observer.observe(entry.target);
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} xs={12}>
        {accounts && accounts.map(account => (
          <Grid item xs={12} md={4} key={account.id}
            onClick={
              () => props.history.push(`resume/${account.id}`)
            }
          >
            <Card className={classes.card}>
              <div style={{ display: 'flex', padding: 20 }}>
                <Avatar style={{ width: 120, height: 120 }} src={account.image}></Avatar>
                <div style={{ textAlign: 'none', marginLeft: 20 }}>
                  <Typography variant="h6" style={{ marginBottom: 10 }}>{account.nickName}</Typography>
                  {account.positions.map(position => {
                    return (`${__POSITIONS[position]}, `)
                  })}
                  <div style={{ marginBottom: 10 }} />
                  {account.technologies.map(tech => {
                    return (<Chip style={{ marginRight: 10, marginBottom: 10 }} label={tech.name} />)
                  })}
                </div>
              </div>
              <CardContent>
                {account.oneLineIntroduce}
                <Typography style={{ textAlign: 'right' }} variant="subtitle2">{`조회수 ${account.hits} 좋아요 ${account.favoriteCount}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div ref={setTarget} style={{ marginTop: 20 }}>데이터가 없습니다.</div>
    </div>
  );
};

export default Explore;
