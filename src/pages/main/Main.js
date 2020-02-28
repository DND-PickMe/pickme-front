import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card, Avatar, CardContent, Chip } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { api } from "api";
import { __POSITIONS } from "constants/values";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
  },
}));

const Main = props => {
  const classes = useStyles();
  const [f_accounts, f_setAccounts] = useState(null);
  const [h_accounts, h_setAccounts] = useState(null);

  useEffect(() => {
    getAccountsByFavorite();
    getAccountsByHits();
  }, [])

  const getAccountsByFavorite = async () => {
    try {
      const res = await api.get('accounts', { params: { orderBy: 'favorite' } });
      if (res.status === 200) {
        f_setAccounts(res.data._embedded.accountResponseDtoList)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAccountsByHits = async () => {
    try {
      const res = await api.get('accounts', { params: { orderBy: 'hits' } });
      if (res.status === 200) {
        h_setAccounts(res.data._embedded.accountResponseDtoList)
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.root}>

      <div style={{ marginBottom: 30 }} />
      <Typography variant="h5" style={{ marginBottom: 30 }}>좋아요 높은 순위</Typography>
      <Grid container spacing={3} xs={12}>
        {f_accounts && f_accounts.map(account => (
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
                    return ( `${__POSITIONS[position]}, ` )
                  })}
                  <div style={{marginBottom: 10}}/>
                  {account.technologies.map(tech => {
                    return ( <Chip style={{ marginRight: 10, marginBottom: 10 }} label={tech.name} />)
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

      <div style={{ marginBottom: 30 }} />
      <Typography variant="h5" style={{ marginBottom: 30 }}>조회수 높은 순위</Typography>
      <Grid container spacing={3} xs={12}>
        {h_accounts && h_accounts.map(account => (
          <Grid item xs={12} md={4} key={account.id}>
            <Card className={classes.card}>
              <div style={{ display: 'flex', padding: 20 }}>
                <Avatar style={{ width: 120, height: 120 }} src={account.image}></Avatar>
                <div style={{ textAlign: 'none', marginLeft: 20 }}>
                  <Typography variant="h6" style={{ marginBottom: 20 }}>{account.nickName}</Typography>
                  <Typography variant="h6" style={{ marginBottom: 20 }}>직군</Typography>
                  <Chip style={{ marginRight: 10 }} label="Java" />
                  <Chip style={{ marginRight: 10 }} label="Spring" />
                  <Chip style={{ marginRight: 10 }} label="Spring boot" />
                </div>
              </div>
              <CardContent>
                {account.oneLineIntroduce}
                <Typography style={{ textAlign: 'right' }} variant="subtitle2">{`좋아요 ${account.favoriteCount}`}</Typography>
                <Typography style={{ textAlign: 'right' }} variant="subtitle2">{`조회수 ${account.hits}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;