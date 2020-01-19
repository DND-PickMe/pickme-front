import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: 30,
        display: 'flex',
        backgroundColor: '#E1E1E1',
    },
    item: {
        flex: 1,
        textAlign: 'center'
    },
    activeStyle: {
        backgroundColor: '#ADFF2F',
    },
});

const AppBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {props.children}
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