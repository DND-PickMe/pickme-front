import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    margin: 10
  }
});

const Root = props => {
  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
};

export default Root;

