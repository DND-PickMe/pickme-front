import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField/TextField';

const useStyles = makeStyles({
	root: {

	},
	licenseName: {

	},
	licenseInstitution: {

	},
	licenseDate: {

	},
	licenseDescription: {

	}
});

const License = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<h2>License</h2>
			<TextField className={classes.licenseName} id="license-name" label="자격증명" variant="outlined" />
			<TextField className={classes.licenseInstitution} id="license-institution" label="발급 기관" variant="outlined" />
			<TextField className={classes.licenseDate} id="license-date" label="발급 날짜" variant="outlined" />
			<TextField className={classes.licenseDescription} id="license-description" fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
		</div>
	);
};

export default License;