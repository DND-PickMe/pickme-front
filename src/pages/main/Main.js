import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardWrapper from "../../components/CardWrapper";
import { Grid, Paper, Typography, Card, Avatar, CardActions, IconButton, CardContent } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

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
  const [target, setTarget] = useState(null);
  const [card, setCard] = useState([1, 2, 3, 4, 5, 6]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginBottom: 30 }}>좋아요 높은 순위</Typography>
      <Grid container spacing={3} xs={12}>
        {}
        {card.map(num => (
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <div style={{ display: 'flex', padding: 20 }}>
                <Avatar style={{width: 120, height: 120}}></Avatar>
                <div style={{textAlign: 'none', marginLeft: 20}}>
                  <Typography variant="h6" style={{ marginBottom: 20 }}>신무곤</Typography>
                  <Typography variant="h6" style={{ marginBottom: 20 }}>Back-End</Typography>
                  <Typography variant="h6">Java, Spring, Web</Typography>
                </div>
              </div>
              <CardActions>
                <IconButton style={{marginLeft: 'auto'}}>
                  <Favorite></Favorite>
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