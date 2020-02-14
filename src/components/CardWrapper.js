import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: 30
  },
  cardWrapper: {
    display: "flex",
    backgroundColor: "#1E90FF",
    height: 240
  },
  card: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    padding: 15,
    marginRight: 20
  }
});

const dummyData = [
  { desc: "준비된 백엔드 개발자", tags: ["java", "spring", "mysql"] },
  { desc: "3년차 자바 개발자입니다.", tags: ["java", "spring", "mysql"] },
  { desc: "front-end 개발자입니다.", tags: ["react", "vue", "html"] },
  { desc: "서버 개발자입니다.!", tags: ["docker", "aws", "mysql"] },
  { desc: "게임 개발자입니다.", tags: ["c#", "nginx", "git"] }
];

const CardWrapper = props => {
  const classes = useStyles();
  const [cards, setCards] = useState(dummyData);

  return (
    <div className={classes.root}>
      <h3>{props.title}</h3>
      <div className={classes.cardWrapper}>
        {cards &&
          cards.map((card, index) =>
            cards.length - 1 > index ? (
              <Card card={card} />
            ) : (
              <Card card={card} style={{ marginRight: 0 }} />
            )
          )}
      </div>
      <div style={{ textAlign: "center", fontSize: 30 }}>{"< >"}</div>
    </div>
  );
};

const Card = props => {
  const classes = useStyles();
  return (
    <div className={classes.card} style={props.style}>
      <h2>{props.card.desc}</h2>
      <h4>{"기술 스택"}</h4>
      {props.card.tags.map(tag => (
        <span>{`${tag} `}</span>
      ))}
    </div>
  );
};

export default CardWrapper;
