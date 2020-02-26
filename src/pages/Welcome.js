import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {PATH_SIGN_IN} from "route/paths";
import { Typography, Button, Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(3),
    fontSize: "28px",
    fontWeight: "bold",
    width: 270,
    borderRadius: 15
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    fontFamily: "Montserrat",
    marginBottom: theme.spacing(3),
  },
  comment: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
  }
}));

const Welcome = props => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <div style={{marginBottom: 40}}/>
        <Container>
          <Typography className={classes.title} variant="h1" >PickMe</Typography>
            <Typography className={classes.comment} variant="h6">회사에게 필요한 인재,</Typography>
            <Typography style={{marginBottom: 50}} className={classes.comment} variant="h6">PickMe에서 찾아보세요!</Typography>
            <Link to={PATH_SIGN_IN} style={{textDecoration: 'none', color: 'inherit'}}>
              <Button className={classes.button} variant="contained" color="primary">회사입니까?</Button>
              <br/>
              <Button className={classes.button} variant="contained" color="primary">구직자입니까?</Button>
            </Link>
        </Container>
      </div>
  );
};

export default Welcome;
