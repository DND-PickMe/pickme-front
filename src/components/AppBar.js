import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import {NavLink} from 'react-router-dom';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {PATH_USER_PROFILE} from "../constants/paths";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    container: {
        width: '1920px',
        height: '64px',
        display: 'flex',
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
    },
    item: {
        position: "relative",
        left : '200px',
        fontFamily: 'Roboto',
        fontSize: '24px',
        fontStyle: 'normal',
        marginLeft: '150px',
    },
    activeStyle: {
        backgroundColor: '#ADFF2F',
    },
    root: {
        width: '80%',
        margin: 'auto',
        marginBottom: 20,
    },
    leftWrapper: {

    },
    rightWrapper: {
        float: 'right',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
});

const AppBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.root}>
            <span className={classes.title}>Pickme</span>
            {props.children}
            <div className={classes.rightWrapper}>
                <NotificationsRoundedIcon fontSize={'large'}/>
                <SendRoundedIcon fontSize={'large'}/>
                <Link to={PATH_USER_PROFILE} >
                    <AccountCircleRoundedIcon fontSize={'large'}/>
                </Link>
            </div>
            </div>
        </div>
    );
};

export const AppBarItem = (props) => {
    const classes = useStyles(props);
    return (
        <NavLink className={classes.item} to={props.to} activeStyle={{backgroundColor: 'gray'}}>
            {props.title}
        </NavLink>
    );
};


export default AppBar;