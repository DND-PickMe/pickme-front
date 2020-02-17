import React from "react";
import { makeStyles } from "@material-ui/styles";
import CardWrapper from "../../components/CardWrapper";

const useStyles = makeStyles({});

const Main = props => {
  const classes = useStyles();

  return (
    <div>
      <h1>Main Page</h1>
      <CardWrapper title={"가장 최근에 올라온 이력서"} />
      <CardWrapper title={"많은 제안을 받은 이력서"} />
      <CardWrapper title={"많은 찜을 당한 이력서"} />
      <CardWrapper title={"많은 좋아요를 받은 이력서"} />
    </div>
  );
};

export default Main;