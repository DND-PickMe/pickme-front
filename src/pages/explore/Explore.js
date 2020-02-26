import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core"

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
  const classes = useStyles();
  const [target, setTarget] = useState(null);
  const [card, setCard] = useState([1]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {threshold: 0.5});
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, card]);

  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting){
      observer.unobserve(entry.target);
      setCard(card.concat([1, 1, 1, 1]));
      observer.observe(entry.target);
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">Explore</Typography>
      <Grid container spacing={3} xs={12}>
        {card.map(num => (
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>card</Paper>
          </Grid>
        ))}
      </Grid>
      <div ref={setTarget}>waiting...</div>
    </div>
  );
};

export default Explore;
