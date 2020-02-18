import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardWrapper from "../../components/CardWrapper";
import {Grid, Paper} from "@material-ui/core";

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

const Main = props => {
  const classes = useStyles();
  const number = [1,2,3,4,5,6,7,8,9];

  return (
    <div className={classes.root}>
      <Grid container spacing={3} xs={12}>
        {number.map(num => (
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>card</Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;