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

export default function GlossaryPage() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Glossary</h4>
        <p className={classes.cardCategoryWhite}>
          Understanding the language
        </p>
      </CardHeader>
      <CardBody>

        <List>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="MetaMask"
              secondary="MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain. It allows users to access their Ethereum wallet through a browser extension or mobile app, which can then be used to interact with decentralized applications."
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Ethereum"
              secondary="Ethereum is a decentralized, open-source blockchain with smart contract functionality. ETH is the native cryptocurrency of the platform. "
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Smart contract"
              secondary="A smart contract is a computer program or a transaction protocol which is intended to automatically execute, control or document legally relevant events and actions according to the terms of a contract or an agreement."
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Definition"
              secondary="explanation"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Definition"
              secondary="explanation"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Definition"
              secondary="explanation"
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Definition"
              secondary="explanation"
            />
          </ListItem>
          <Divider />
        </List>



      </CardBody>
    </Card>
  );
}
