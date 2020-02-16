import React from "react";
import { makeStyles } from "@material-ui/styles";
import {Link} from "react-router-dom";
import {PATH_SIGN_IN} from "../route/paths";

const Welcome = props => {
  const classes = useStyles();
  return (
      <div>
        <div className={classes.title}>PickMe</div>
        <div className={classes.comment}>
          회사에게 필요한 인재, <br />
          PickMe에서 찾아보세요!
        </div>

        <Link to={PATH_SIGN_IN} style={{textDecoration: 'none', color: 'inherit'}}>
          <button className={classes.button}>
            {"회사입니까?"}
          </button>
          <button className={classes.button}>
            {"구직자 입니까?"}
          </button>
        </Link>
      </div>
  );
};

const useStyles = makeStyles({
  title: {
    marginLeft: "300px",
    marginTop: 150,
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontSize: "88px",
    fontWeight: "bold"
  },
  comment: {
    marginLeft: "300px",
    marginTop: "45px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontSize: "30px",
    fontWeight: "bold"
  },
  button: {
    marginTop: "35px",
    marginLeft: "310px",
    backgroundColor: "#3A68F9",
    borderRadius: "30px",
    width: "380px",
    height: "100px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#FFFFFF",
    display: "block",
  }
});

export default Welcome;
