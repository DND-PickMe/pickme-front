import React from 'react';
import { makeStyles } from '@material-ui/styles';
import SignIn from './auth/SignIn';

const useStyles = makeStyles({
    title: {
        marginLeft: '300px',
        marginTop: 150,
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontSize: '88px',
        fontWeight: 'bold'
    },
    comment: {
        marginLeft: '300px',
        marginTop: '45px',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontSize: '30px',
        fontWeight: 'bold',

    },
});
const Welcome = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.title}>
                PickMe
            </div>
            <div className={classes.comment}>
                회사에게 필요한 인재, <br />
                PickMe에서 찾아보세요!
            </div>
            <SignIn title = '회사입니까?'/>
            <SignIn title = '구직자입니까?'/>
        </div>
    );
};

export default Welcome;