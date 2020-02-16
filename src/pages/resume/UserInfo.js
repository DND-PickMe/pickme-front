import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField/TextField';

const useStyles = makeStyles({
	root: {

	},
	userInfoName: {

	},
	userInfoEmail: {

	}

});

const UserInfo = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<h2>UserInfo</h2>
			<TextField className={classes.userInfoName} id="userInfo-name" label="name" variant="outlined" />
			<TextField className={classes.userInfoEmail} id="userInfo-email" label="email" variant="outlined" />
		</div>
	);
};

export default UserInfo;