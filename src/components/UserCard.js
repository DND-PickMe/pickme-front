import React from "react";
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Avatar, Typography, Chip, CardContent, Card } from "@material-ui/core";
import { __POSITIONS, __CAREER } from "constants/values";

const useStyles = makeStyles(theme => ({
}));

const UserCard = props => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {props.accounts && props.accounts.map(account => (
        <Grid item xs={12} md={4} key={account.id}
          onClick={
            () => props.history.push(`resume/${account.id}`)
          }
        >
          <Card className={classes.card}>
            <div style={{ display: 'flex', padding: 20 }}>
              <Avatar style={{ width: 120, height: 120 }} src={account.image}></Avatar>
              <div style={{ textAlign: 'none', marginLeft: 20 }}>
                <Typography variant="h6" style={{ marginBottom: 10 }}>{account.nickName}</Typography>
                {account.positions.map(position => {
                  return (`${__POSITIONS[position]}, `)
                })}
                <div style={{ marginBottom: 10 }} />
                {account.technologies.map(tech => {
                  return (<Chip style={{ marginRight: 10, marginBottom: 10 }} label={tech.name} />)
                })}
              </div>
            </div>
            <CardContent>
              <Typography variant="subtitle2">{__CAREER[account.career]}</Typography>
              {account.oneLineIntroduce}
              <Typography style={{ textAlign: 'right' }} variant="subtitle2">{`조회수 ${account.hits} 좋아요 ${account.favoriteCount}`}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
};

export default UserCard;
