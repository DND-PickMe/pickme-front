import React from 'react';
import {makeStyles} from '@material-ui/styles';

const usestyles = makeStyles({
    container: {
        margin: 45,
    },
});

const root = (props) => {
    const classes = usestyles();
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    );
};

export default root;