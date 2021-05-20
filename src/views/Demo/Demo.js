import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
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

export default function DemoPage() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Demo videos</h4>
        <p className={classes.cardCategoryWhite}>
          Watch the videos to see how it works
        </p>
      </CardHeader>
      <CardBody>

        <List>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Topic area"
              secondary="embedded video"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Topic area"
              secondary="embedded video"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Topic area"
              secondary="embedded video"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Topic area"
              secondary="embedded video"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Topic area"
              secondary="embedded video"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Topic area"
              secondary="embedded video"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Topic area"
              secondary="embedded video"
            />
          </ListItem>
          <Divider />
        </List>



      </CardBody>
    </Card>
  );
}
