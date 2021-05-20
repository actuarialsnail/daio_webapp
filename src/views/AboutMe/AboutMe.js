import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import avatar from "assets/img//faces/default.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function AboutMe() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card profile>
            <CardAvatar profile>
              <img src={avatar} alt=""/>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>@actuarialsnail</h4>
              <p className={classes.description}>
                Actuary, full stack developer, trader, data scientist, tinkerer and intellectually curious about almost everything.
              </p>
              <p className={classes.description}>
                Want to buy me a drink?
              </p>
              <p className={classes.description}>
                BTC: bc1qpdwu8xl8f0em5g6hqpkxm3k2wwac9l094nhy59
              </p>
              <p className={classes.description}>
                ETH: 0x1b55cCBeE254d0954Ba8daAc28d8A599E829Db5E
              </p>
              <Button color="primary" round href="https://github.com/actuarialsnail">
                Visit my page
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
