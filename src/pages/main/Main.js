import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, IconButton, Avatar } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  card: {
    height: 240,
  }
}));

const Main = props => {
  const classes = useStyles();
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={classes.root}>
      <Grid container spacing={3} xs={12}>
        {number.map(num => (
          <Grid item xs={12} md={4}>
            <Card className={classes.card} variant="outlined">
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
                }
                title="Februry 24, 2020"
                subheader="Hello"
              />
              <CardContent>
                <Typography variant="subtitle2">
                  닉네임
                </Typography>
                <Typography variant="subtitle2">
                  직군
                </Typography>
                <Typography variant="subtitle2">
                  주요기술
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" style={{marginLeft: 'auto'}}>
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;