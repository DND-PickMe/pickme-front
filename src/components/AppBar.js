import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import MenuIcon from "@material-ui/icons/Menu";
import {PATH_AUTH_CHECK, PATH_SIGN_IN, PATH_SIGN_UP, PATH_USER_PROFILE, PATH_WELCOME} from "../route/paths";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {AuthConsumer} from "../context/AuthContext";

const AppBar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <header className={classes.root}>
      <div style={{ flex: 0.6 }} />
      <Link
        to={PATH_WELCOME}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <span className={classes.title}>Pickme</span>
      </Link>
      <div style={{ flex: 3 }} />
      {props.children}
      <div style={{ flex: 3 }} />

      <AuthConsumer>
        {
          auth => {
            console.log(auth);
            return (
              auth.state.userAuthorized
                ?
                <div>
                  <NotificationsRoundedIcon fontSize={"large"} />
                  <Link
                    to={PATH_USER_PROFILE}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <AccountCircleRoundedIcon fontSize={"large"} />
                  </Link>
                  <MenuIcon fontSize={"large"} onClick={openMenu} />
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                  >
                    <Link
                      to={PATH_USER_PROFILE}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <MenuItem onClick={closeMenu}>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={closeMenu}>My Resume</MenuItem>
                    <MenuItem
                      onClick={() => {
                        localStorage.removeItem("token");
                        props.history.replace(PATH_AUTH_CHECK);
                        closeMenu();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>

                : <div>
                  <Link className={classes.appBarItem} style={{marginRight: 20}} to={PATH_SIGN_IN}>signIn</Link>
                  <Link className={classes.appBarItem} to={PATH_SIGN_UP}>signUp</Link>
                </div>
            )
          }
        }

      </AuthConsumer>
      <div style={{ flex: 0.5 }} />
    </header>
  );
};

export const AppBarItem = props => {
  const classes = useStyles(props);
  return (
    <Link className={classes.appBarItem} to={props.to}>
      {props.title}
    </Link>
  );
};

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    width: "100%",
    position: "fixed",
    display: "flex",
    top: 0
  },
  title: {
    fontWeight: "bold",
    fontSize: 30
  },
  appBarItem: {
    textAlign: "center",
    textDecoration: "none",
    color: "inherit",
    flex: 1,
    fontSize: 24,
  }
});

export default AppBar;
