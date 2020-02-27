import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card, Avatar, CardContent } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { api } from "api";

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
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    getAccounts();
  }, [])

  const getAccounts = async () => {
    try {
      const res = await api.get('accounts');
      if (res.status === 200) {
        setAccounts(res.data._embedded.accountResponseDtoList)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>

      <div style={{marginBottom: 30}}/>
      <Typography variant="h5" style={{ marginBottom: 30 }}>좋아요 높은 순위</Typography>
      <Grid container spacing={3} xs={12}>
        {accounts && accounts.map(account => (
          <Grid item xs={12} md={4} key={account.id}>
            <Card className={classes.card}>
              <div style={{ display: 'flex', padding: 20 }}>
                <Avatar style={{width: 120, height: 120}} src={account.image}></Avatar>
                <div style={{textAlign: 'none', marginLeft: 20}}>
                  <Typography variant="h6" style={{ marginBottom: 20 }}>{account.nickName}</Typography>
                  <Typography variant="h6" style={{ marginBottom: 20 }}>직군</Typography>
                  <Typography variant="h6">Java, Spring, Web</Typography>
                </div>
              </div>
              <CardContent>
                {account.oneLineIntroduce}
                <Typography variant="subtitle2">{`좋아요 ${account.favoriteCount}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{marginBottom: 30}}/>
      <Typography variant="h5" style={{ marginBottom: 30 }}>조회수 높은 순위</Typography>
      <Grid container spacing={3} xs={12}>
        {accounts && accounts.map(account => (
          <Grid item xs={12} md={4} key={account}>
            <Card className={classes.card}>
              <div style={{ display: 'flex', padding: 20 }}>
                <Avatar style={{width: 120, height: 120}} src={account.image}></Avatar>
                <div style={{textAlign: 'none', marginLeft: 20}}>
                  <Typography variant="h6" style={{ marginBottom: 20 }}>{account.nickName}</Typography>
                  <Typography variant="h6" style={{ marginBottom: 20 }}>직군</Typography>
                  <Typography variant="h6">{account.technology}</Typography>
                </div>
              </div>
              <CardContent>
                {account.oneLineIntroduce}
                <Typography variant="subtitle2">{`좋아요 ${account.favoriteCount}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;