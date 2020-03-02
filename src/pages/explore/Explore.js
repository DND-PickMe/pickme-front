import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Select, FormControl, MenuItem, InputLabel, Card, TextField, Button, Input } from "@material-ui/core"
import { api } from "api";
import { __POSITIONS, __CAREER } from "constants/values";
import UserCard from "components/UserCard";

const useStyles = makeStyles(theme => ({
  root: {
  },
  formControl: {
    minWidth: 120,
  },
}));


let loadUrl = 'accounts';
let loadable = true;
const Explore = props => {
  const classes = useStyles();
  const [target, setTarget] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState({ career: '', position: '' });

  const getAccounts = async () => {
    if (!loadable) { return }
    try {
      const res = await api.get(loadUrl, { params: { size: 18 } });
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
    let observer;
    if (target) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
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
      <Card elevation={1} style={{margin: 12, padding: 8}}>
        <FormControl variant="outlined" className={classes.formControl} style={{marginRight: 12}}>
          <InputLabel id="demo-simple-select-label">직군</InputLabel>
          <Select
            labelWidth={40}
            value={filter.position}
            onChange={filterChange("position")}
          >
            {Object.keys(__POSITIONS).map(key => (
              <MenuItem value={key}>{__POSITIONS[key]}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl} style={{marginRight: 12}}>
          <InputLabel id="demo-simple-select-label">경력</InputLabel>
          <Select
            labelWidth={40}
            value={filter.career}
            onChange={filterChange("career")}
          >
            {Object.keys(__CAREER).map(key => (
              <MenuItem value={key}>{__CAREER[key]}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl} style={{marginRight: 12}}>
          <TextField label="검색" variant="outlined" />
        </FormControl>

        <Button variant="contained" color="primary" style={{marginRight: 12, height: 56}}>검색</Button>
      </Card>
      <div style={{ marginTop: 20 }} />

      <Grid container spacing={3} xs={12}>
        <UserCard accounts={accounts} {...props} />
      </Grid>
      <div ref={setTarget} style={{ margin: 20 }}>데이터가 없습니다.</div>
    </div >
  );
};

export default Explore;
