import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {PATH_SIGN_IN} from "../route/paths";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
    fontSize: "30px",
    fontWeight: "bold",
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    fontFamily: "Montserrat",
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
        <Typography className={classes.title} variant="h1" >PickMe</Typography>
        <Typography className={classes.comment} variant="h6">회사에게 필요한 인재,</Typography>
        <Typography className={classes.comment} variant="h6">PickMe에서 찾아보세요!</Typography>
        <Link to={PATH_SIGN_IN} style={{textDecoration: 'none', color: 'inherit'}}>
          <Button className={classes.button} variant="contained" color="primary">회사입니까?</Button>
          <Button className={classes.button} variant="contained" color="primary">구직자 입니까?</Button>
        </Link>
      </div>
  );
};

// const useStyles = makeStyles({
//   title: {
//     marginLeft: "300px",
//     marginTop: 150,
//     fontFamily: "Montserrat",
//     fontStyle: "normal",
//     fontSize: "88px",
//     fontWeight: "bold"
//   },
//   comment: {
//     marginLeft: "300px",
//     marginTop: "45px",
//     fontFamily: "Montserrat",
//     fontStyle: "normal",
//     fontSize: "30px",
//     fontWeight: "bold"
//   },
//   button: {
//     marginTop: "35px",
//     marginLeft: "310px",
//     backgroundColor: "#3A68F9",
//     borderRadius: "30px",
//     width: "380px",
//     height: "100px",
//     fontSize: "30px",
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     display: "block",
//   }
// });

export default Welcome;
