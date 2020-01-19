import React from 'react';
import {makeStyles} from '@material-ui/styles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {Link} from "react-router-dom";
import {PATH_USER_PROFILE} from "../constants/paths";

const useStyles = makeStyles({
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
        fontSize: 30,
    },
});
const UserInfo = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span className={classes.title}>Pickme</span>
            <div className={classes.rightWrapper}>
                <NotificationsRoundedIcon fontSize={'large'}/>
                <SendRoundedIcon fontSize={'large'}/>
                <Link to={PATH_USER_PROFILE} >
                    <AccountCircleRoundedIcon fontSize={'large'}/>
                </Link>
            </div>
        </div>
    );
};

export default UserInfo;
