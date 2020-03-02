import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Select, FormControl, MenuItem, InputLabel, Card, TextField, Button } from "@material-ui/core"
import { api } from "api";
import { __POSITIONS, __CAREER } from "constants/values";
import UserCard from "components/UserCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 240,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const Explore = props => {
  let loadable = true;
  let loadUrl = 'accounts';
  const classes = useStyles();
  const [target, setTarget] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState({ career: '', position: '' });

  const getAccounts = async () => {
    if (!loadable) { return }
    try {
      const res = await api.get(loadUrl);
      if (res.status === 200) {
        const results = res.data._embedded.accountResponseDtoList
        setAccounts(accounts.concat(results))
        loadable = Boolean(res.data._links.next);
        if (res.data._links.next) {
          loadUrl = res.data._links.next.href
          loadUrl = loadUrl.replace("http", "https")
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    if (target) {
      observer.observe(target);
    }
  }, [target, accounts]);


  const handleIntersection = entrys => {
    const first = entrys[0];
    if (first.isIntersecting) {
      getAccounts();
    }
  }

  const filterChange = key => event => {
    setFilter({ ...filter, [key]: event.target.value })
    console.log(filter);
  };

  return (
    <div className={classes.root}>
      <Card elevation={1}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">직군</InputLabel>
          <Select
            value={filter.position}
            onChange={filterChange("position")}
          >
            {Object.keys(__POSITIONS).map(key => (
              <MenuItem value={key}>{__POSITIONS[key]}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">경력</InputLabel>
          <Select
            value={filter.career}
            onChange={filterChange("career")}
          >
            {Object.keys(__CAREER).map(key => (
              <MenuItem value={key}>{__CAREER[key]}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <TextField label="검색" variant="outlined" />
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <Button style={{height: "100%"}} variant="outlined">검색</Button>
        </FormControl>
      </Card>
      <div style={{ marginTop: 20 }} />
      <Grid container spacing={3} xs={12}>
        <UserCard accounts={accounts} {...props} />
      </Grid>
      <div ref={setTarget} style={{ marginTop: 20 }}>데이터가 없습니다.</div>
    </div>
  );
};

export default Explore;
