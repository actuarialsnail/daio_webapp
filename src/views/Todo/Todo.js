import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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

export default function TodoPage() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>To-do list</h4>
        <p className={classes.cardCategoryWhite}>
          Ideas for future developments and enhancements
        </p>
      </CardHeader>
      <CardBody>
        <div>
          <h4>Tokenised model</h4>
          <p>A tokenised model (e.g. Decenture coin/token) would provide the budget and resource that the project deserves. That means all deposits and payments are conducted in Decenture which is the native currency for the current and all future insurance products.</p>
          <p>The de-fi protocals will allow Decenture to be traded (e.g. for ETH) in the markplace after its initial fund raising rounds. Part of the total supply of the token can also be withheld to ensure the solvency of the fund.</p>
          <p>The appreciation and depreciation of the token is then determined by market supply and demand which is also expected to reflect the actual economics of the fund e.g. the value of the token will fluctate depending on the distributable surplus of the fund.</p>
          <p>An interesting by-proudct of this model would be that the market value of liabilities may be more easily be observed.</p>
          <h4>Current model</h4>
          <p>The deposited amount in ETH can be staked (in a PoS consensus model) in order to earn investment income for the investors. </p>
          <h4>Feature enhancements</h4>
          <p>The annuity factor can be automated through balancing the assets, liabilities and historical experience of the policy claims and termination. A polynomial proxy function can be derived similar to the Maker DAO project to ensure the solvency of the fund is maintained (instead of the value of DAI being 1 USD)</p>
          <p>The oracle mechanism can be improved by introducing external verifications such as social media account, open banking API, government database, and/or mobile app biometric login confirmations if the dapp is deployed on mobile devices.</p>
          <p>Improvement in the oracle will allow other life insurance covers to be offered via smart contracts.</p>
          <p>For protection products, the importance of underwriting and pricing is much greater than annuity products, however in a decentralised model, communities can be set up to self-regulate the underwriting process with the aid of the automated experience analysis and pricing engine.</p>
          <p>Fundamentally, there should be no need for the decentralised autonomous insurance organisation to set up statutory capital requirements nor it can be subject to regualtory scrutiny in the most decentralised sense, such requirements can be easily developed especially if a standard formula appraoch is used.</p>
          {/* 
          <Tasks
            checkedIndexes={[0, 3]}
            tasksIndexes={[0, 1, 2, 3]}
            tasks={bugs}
          /> */}
        </div>
      </CardBody>
    </Card>
  );
}
