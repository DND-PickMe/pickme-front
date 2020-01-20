import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#1E90FF',
        width: '100%',
        height: 200,
        marginBottom: 30
    },
});

const CardWrapper = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
        </div>
    );
};

export default CardWrapper;
