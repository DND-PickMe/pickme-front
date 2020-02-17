import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { InputLabel, FormControl } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const dummyData = {
  selects: [
    { label: "업무분야", items: ["front-end", "back-end"] },
    { label: "희망연봉", items: ["1000~2000", "1500~2000"] }
  ]
};
const Explore = props => {
  const classes = useStyles();
  const selects = dummyData.selects;
  return (
    <div className={classes.root}>
      <h1>Explore</h1>

      {selects &&
        selects.map(select => (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              {select.label}
            </InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              {select.items.map((item, idx) => (
                <MenuItem key={idx} value={30}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
    </div>
  );
};

export default Explore;
