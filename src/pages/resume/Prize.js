import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField/TextField';

const useStyles = makeStyles({
	root: {

	},
	prizeCompetition: {

	},
	prizeName: {

	},
	prizeDate: {

	},
	prizeDescription: {

	}
});

const Prize = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<h2>Prize</h2>
			<TextField className={classes.prizeCompetition} id="prize-competition" label="대회명" variant="outlined" />
			<TextField className={classes.prizeName} id="prize-name" label="상 명" variant="outlined" />
			<TextField className={classes.prizeDate} id="prize-date" label="수상날짜" variant="outlined" />
			<TextField className={classes.prizeDescription} id="prize-description" fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
		</div>
	);
};

export default Prize;