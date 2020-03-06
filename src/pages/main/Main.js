import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { api } from "api";
import { __POSITIONS } from "constants/values";
import UserCard from "components/UserCard";
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  }
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
      const res = await api.get('accounts', { params: { orderBy: 'favorite', size: 6 } });
      if (res.status === 200) {
        f_setAccounts(res.data._embedded.accountResponseDtoList)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAccountsByHits = async () => {
    try {
      const res = await api.get('accounts', { params: { orderBy: 'hits', size: 6 } });
      if (res.status === 200) {
        h_setAccounts(res.data._embedded.accountResponseDtoList)
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.root}>
      <Typography variant="h5" style={{ margin: "20px 0px" }}>좋아요 순위</Typography>
      {f_accounts ?
        <UserCard accounts={f_accounts} {...props} />
        :
        <Grid container spacing={2}>
          {[360, 350, 345, 360, 350, 360, 345].map((h, i) =>
            <Grid item xs={12} md={4} key={i}>
              <Skeleton animation="wave" style={{ height: h }} />
            </Grid>
          )}
        </Grid>

      }

      <Typography variant="h5" style={{ margin: "20px 0px" }}>조회수 순위</Typography>
      {h_accounts ?
        <UserCard accounts={h_accounts} {...props} />
        :
        <Grid container spacing={2}>
          {[360, 350, 345, 360, 350, 360, 345].map((h, i) =>
            <Grid item xs={12} md={4} key={i}>
              <Skeleton animation="wave" style={{ height: h }} />
            </Grid>
          )}
        </Grid>
      }
    </div>
  );
};

export default Main;