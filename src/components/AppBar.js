import { AppBar, Toolbar, Typography, IconButton, Button, Hidden, Drawer, List, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState, useEffect } from "react";
import { PATH_AUTH_CHECK, PATH_SIGN_IN, PATH_SIGN_UP, PATH_USER_PROFILE, PATH_USER_RESUME, PATH_WELCOME, PATH_MAIN, PATH_EXPLORE, PATH_ENTERPRISE } from "../route/paths";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { AuthConsumer, AuthContext } from "../context/AuthContext";

import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

export default props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { checkUserAuth } = useContext(AuthContext).actions;
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    checkUserAuth();
  }, [])

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = b => {
    setDrawer(b);
  };


  return (
    <AppBar position="static">
      {console.log(props)}
      <Toolbar>
        <Hidden smUp>
          <IconButton onClick={e => toggleDrawer(true)} className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
            <MenuIcon></MenuIcon>
          </IconButton>
        </Hidden>

        
        <Drawer open={drawer} onClose={e => toggleDrawer(false)}>
          <List>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={PATH_MAIN}>
              <ListItem button>
                <ListItemText primary={"Main"} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={PATH_EXPLORE}>
              <ListItem button>
                <ListItemText primary={"Explore"} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={PATH_ENTERPRISE}>
              <ListItem button>
                <ListItemText primary={"Enterprise"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        
        <Typography
          variant="h6"
          color="inherit"
          className={classes.title}
          onClick={() =>
            props.history.push(PATH_WELCOME)
          }
        >Pickme</Typography>

        <Hidden smDown>
          <Link style={{ textDecoration: "none", color: "inherit" }} to={PATH_MAIN}>
            <Button color="inherit">Main</Button>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }} to={PATH_EXPLORE}>
            <Button color="inherit">Explore</Button>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit", marginRight: 50}} to={PATH_ENTERPRISE}>
            <Button color="inherit">Enterprise</Button>
          </Link>
        </Hidden>

        <AuthConsumer>
          {
            auth => {
              console.log(auth);
              return (
                auth.state.userAuthorized
                  ?
                  <>
                    <AccountCircleRoundedIcon edge="end" fontSize={"large"}
                      onClick={() =>
                        props.history.push(PATH_USER_PROFILE)
                      }
                    />
                    <MenuIcon edge="end" fontSize={"large"} onClick={openMenu} />
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
                      <Link
                        to={PATH_USER_RESUME}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem onClick={closeMenu}>My Resume</MenuItem>
                      </Link>
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
                  </>
                  :
                  <>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={PATH_SIGN_IN}>
                      <Button color="inherit">SignIn</Button>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={PATH_SIGN_UP}>
                      <Button color="inherit">SignUp</Button>
                    </Link>
                  </>
              )
            }}
        </AuthConsumer>
      </Toolbar>
    </AppBar >
  )
}