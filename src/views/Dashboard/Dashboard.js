import React, { useState, useEffect, useRef } from 'react';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import AccessTime from "@material-ui/icons/AccessTime";
import Cloud from "@material-ui/icons/Cloud";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { InfoOutlined } from '@material-ui/icons';
import AddAlert from "@material-ui/icons/AddAlert";
// dialog
import CustomizedDialogs from 'components/CustomDialog/Dialog.js';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Tasks from "components/Tasks/Tasks.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// web3
import Web3 from 'web3';
import { contract_abi } from "assets/abi/contract_abi.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const deployed_network = "Rinkeby";
const deployed_contract_address = '0x1a2264388fb69d7c946f55e56bc218c989b01378';
const standard_contract_amount = "0.1";

export default function Dashboard() {
  const classes = useStyles();

  const [count, setCount] = useState(0);
  const [timestamp, setTimestamp] = useState("Loading...");
  const [status, setStatus] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState("please load MetaMask to explore the demo.");
  const [contract, setContract] = useState(undefined);
  // roles state variables
  const [isInvestor, setIsInvestor] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [isPolicyholder, setIsPolicyisPolicyholder] = useState(undefined);
  const [hasReqInvestor, setHasReqInvestor] = useState(undefined);
  const [reqInvestorList, setReqInvestorList] = useState(undefined);
  const [hasReqPolicyholder, setHasReqPolicyholder] = useState(undefined);
  const [reqPolicyholderList, setReqPolicyholderList] = useState(undefined);
  const [forApproveInvestor, setForApproveInvestor] = useState([]);
  const [forApprovePolicyholder, setForApprovePolicyholder] = useState([]);
  const firstUpdate = useRef(true);

  // fund state variables
  const [assets, setAssets] = useState(undefined);
  const [liabilities, setLiabilities] = useState(undefined);
  const [assetsArr, setAssetsArr] = useState([]);
  const [liabilitiesArr, setLiabilitiesArr] = useState([]);
  const [NAVArr, setNAVArr] = useState([]);
  const [totalClaims, setTotalClaims] = useState(undefined);
  const [contractBasis, setContractBasis] = useState(undefined);

  // user state variables
  const [invData, setInvData] = useState({});
  const [policyData, setPolicyData] = useState({});

  // styling state variables  
  const [sbar, setSbar] = React.useState(false);
  const [bdOpen, setBdOpen] = React.useState(false);
  const showNotification = () => {
    setSbar(true);
    setTimeout(function () {
      setSbar(false);
    }, 10000);
  }

  // loading required only once per session/account

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('new account detected');
      window.location.reload();
    })
    window.ethereum.on('chainChanged', function (networkId) {
      setStatus(false);
      console.log('new chain detected');
      window.location.reload();
    })
    async function checkAccount() {
      const accountsOnEnable = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accountsOnEnable);
      setStatus(true);
    }
    async function loadWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        checkAccount();
        setWeb3(web3);
        return new web3.eth.Contract(contract_abi, deployed_contract_address);
      }
    }
    async function load() {
      const contract = await loadWeb3();
      setContract(contract);
      console.log('Ready!');
    }
    load();
  }, []);

  // loading required when states are updated

  useEffect(() => {

    async function checkRolesValues() {

      // check for roles
      const isInvestor = await contract.methods.isInvestor(accounts[0]).call();
      const isAdmin = await contract.methods.isAdmin(accounts[0]).call();
      const isPolicyholder = await contract.methods.isPolicyholder(accounts[0]).call();
      setIsInvestor(isInvestor);
      setIsAdmin(isAdmin);
      setIsPolicyisPolicyholder(isPolicyholder);

      // load request investors list
      const _reqInvestorList = await contract.methods.getRequestInvestorsArr().call();
      // const reqInvestorList = ['0x4361b9048874304296e5d2bc30def0413e2e9db4'];
      setReqInvestorList(_reqInvestorList);
      const investorFound = _reqInvestorList.findIndex(item => accounts[0].toLowerCase() === item.toLowerCase());
      if (investorFound !== -1) setHasReqInvestor(true);

      // load request policyholders list
      const _reqPolicyholderList = await contract.methods.getRequestPolicyholdersArr().call();
      // const reqPolicyholderList = [];
      // console.log(reqPolicyholderList);
      setReqPolicyholderList(_reqPolicyholderList);
      const policyholderFound = _reqPolicyholderList.findIndex(item => accounts[0].toLowerCase() === item.toLowerCase());
      if (policyholderFound !== -1) setHasReqPolicyholder(true);

      // load account specific values
      if (isInvestor) {
        const investment = await contract.methods.investments(accounts[0]).call();
        const data = {
          deposit: web3.utils.fromWei(investment.deposit, 'ether').slice(0, 9),
          surplus: web3.utils.fromWei(investment.surplus, 'ether').slice(0, 9)
        }
        setInvData(data);
      }

      if (isPolicyholder) {
        const policy = await contract.methods.policies(accounts[0]).call();
        const data = {
          deposit: web3.utils.fromWei(policy.deposit, 'ether').slice(0, 9),
          payAmount: web3.utils.fromWei(policy.payAmount, 'ether').slice(0, 9),
          payTermRemain: policy.payTermRemain,
          lastClaimTime: policy.lastClaimTime,
          totalClaimAmount: web3.utils.fromWei(policy.totalClaimAmount, 'ether').slice(0, 9),
          inforce: policy.inforce
        }
        setPolicyData(data);
      }

    }

    async function checkBasis() {
      let basis = { deployed_addr: deployed_contract_address, deployed_network: deployed_network };
      basis.inflation = await contract.methods.inflation().call();
      basis.fee = await contract.methods.fee().call();
      basis.a_x = await contract.methods.a_x().call();
      basis.term = await contract.methods.term().call();
      basis.payInterval = await contract.methods.payInterval().call();
      basis.awolLimitTerm = await contract.methods.awolLimitTerm().call();
      basis.solvencyTarget = await contract.methods.solvencyTarget().call();
      basis.solvencyCeiling = await contract.methods.solvencyCeiling().call();

      setContractBasis(basis);
    }
    if (contract) {
      checkBasis(contract);
    }
    if (contract && accounts !== "please load MetaMask to explore the demo.") {
      checkRolesValues();
    }

  }, [accounts, contract, web3, status])

  async function loadFundStats() {
    if (!window.ethereum) {
      return;
    }
    const assets = web3.utils.fromWei(await web3.eth.getBalance(deployed_contract_address), "ether");
    setAssets(assets.slice(0, 9));
    const _assetsArr = assetsArr;
    // console.log(assetsArr);
    _assetsArr.push(Number(assets.slice(0, 9)))
    if (_assetsArr.length > 6) _assetsArr.shift();
    setAssetsArr(_assetsArr);

    const liabilities = web3.utils.fromWei(await contract.methods.liabilities().call(), "ether");
    setLiabilities(liabilities.slice(0, 9));
    const _liabilitiesArr = liabilitiesArr;
    // console.log(liabilitiesArr);
    _liabilitiesArr.push(Number(liabilities.slice(0, 9)))
    if (_liabilitiesArr.length > 6) _liabilitiesArr.shift();
    setLiabilitiesArr(_liabilitiesArr);

    const solvency = solvencyCalc(assets, liabilities);
    const _NAVArr = NAVArr;
    _NAVArr.push(solvency.nav);
    if (_NAVArr.length > 6) _NAVArr.shift();
    setNAVArr(_NAVArr);

    const totalClaims = web3.utils.fromWei(await contract.methods.totalClaims().call(), "ether");
    setTotalClaims(totalClaims.slice(0, 9));
  }

  // smart contract function APIs

  const runFullValuation = () => {
    async function valuation() {
      setBdOpen(true);
      showNotification();
      const tx = await contract.methods.liabVal().send({ from: accounts[0] });
      console.log(tx);
      setBdOpen(false);
    }
    valuation();

  }

  const becomeAdmin = () => {
    async function request() {
      setBdOpen(true);
      showNotification();
      const tx = await contract.methods.addAdmin(accounts[0]).send({ from: accounts[0] });
      console.log(tx);
      setBdOpen(false);
    }
    request();
  }

  const becomeOracle = () => {
    async function request() {
      setBdOpen(true);
      showNotification();
      const tx = await contract.methods.addOracle(accounts[0]).send({ from: accounts[0] });
      console.log(tx);
      setBdOpen(false);
    }
    request();
  }

  const invest = async () => {
    setBdOpen(true);
    showNotification();
    const amountToSend = web3.utils.toWei(standard_contract_amount, "ether"); // Convert to wei value
    const tx = await contract.methods.invest().send({ from: accounts[0], value: amountToSend });
    console.log(tx);
    setStatus(false);
    setBdOpen(false);
  }

  const invWithdrawal = async () => {
    setBdOpen(true);
    showNotification();
    const tx = await contract.methods.disvest().send({ from: accounts[0] });
    console.log(tx);
    setStatus(false);
    setBdOpen(false);
  }

  const deposit = async () => {
    setBdOpen(true);
    showNotification();
    const amountToSend = web3.utils.toWei(standard_contract_amount, "ether"); // Convert to wei value
    const tx = await contract.methods.policyRegister().send({ from: accounts[0], value: amountToSend });
    console.log(tx);
    setStatus(false);
    setBdOpen(false);
  }

  const policyClaim = async () => {
    setBdOpen(true);
    showNotification();
    const tx = await contract.methods.policyClaim().send({ from: accounts[0] });
    console.log(tx);
    setStatus(false);
    setBdOpen(false);
  }

  const requstRole = (role) => {
    async function request(role) {
      setBdOpen(true);
      showNotification();
      let tx;
      switch (role) {
        case 'investor':
          tx = await contract.methods.requestInvestor().send({ from: accounts[0] });
          console.log('investor request done at', tx);
          setStatus(false);
          break;
        case 'policyholder':
          tx = await contract.methods.requestPolicyholder().send({ from: accounts[0] });
          console.log('policyholder request done at', tx);
          setStatus(false);
          break;
        default:
          break;
      }
      setBdOpen(false);
    }
    request(role);
  }

  const grantRole = (role) => {
    setBdOpen(true);
    showNotification();
    let batch = new web3.BatchRequest();
    switch (role) {
      case 'investor':
        forApproveInvestor.forEach(addr => {
          batch.add(contract.methods.addInvestor(addr).send.request({ from: accounts[0] }))
        })
        break;
      case 'policyholder':
        forApprovePolicyholder.forEach(addr => {
          batch.add(contract.methods.addPolicyholder(addr).send.request({ from: accounts[0] }))
        })
        break;
      default:
        break;
    }
    batch.execute();
    setBdOpen(false);
  }

  // admin grant roles functionality

  const investorSelectorCb = (valueList) => {
    setForApproveInvestor(valueList);
  }

  const policyholderSelectorCb = (valueList) => {
    setForApprovePolicyholder(valueList);
  }

  // status variable update to trigger refresh

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false; //prevent init execution
    } else {
      setStatus(true);
    }

  }, [forApproveInvestor, forApprovePolicyholder, invData, policyData])

  // timer interval

  useInterval(() => {
    if ((count) % 10 === 0) {
      loadFundStats();
      setCount(1);
      // console.log('reloaded fund stats')
    } else {
      setCount(count + 1);
    }
    const timestamp = new Date();
    setTimestamp(timestamp.toUTCString());
  }, 1000);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // unit formatting

  const formatChart = (array) => {
    const high = Math.max(...array) * 1.2;
    const low = Math.min(...array) * (1 - 0.2);
    return { low, high, axisX: { showLabel: false, offset: 0 } }
  }

  // conversion functions

  const solvencyCalc = (a, l) => {
    const nav = a - l;
    let ratio;
    if (l > 0) { ratio = (a / l * 100); }
    else ratio = undefined;

    return { nav, ratio }
  }

  return (
    <div>
      <p>{timestamp}</p>
      <p>Welcome, {status ? "account: " : ""}{accounts}</p>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          {/* <Button color="primary" onClick={checkBasis}>View contract terms</Button> */}
          {contractBasis ? <CustomizedDialogs open={true} data={contractBasis} disabled={contractBasis === undefined ? true : false} /> : null}
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <AccountBalanceIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Assets</p>
              <h3 className={classes.cardTitle}>
                {assets} <small>ETH</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <AccessTime /> updated {count} seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <AssignmentIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Liabilities</p>
              <h3 className={classes.cardTitle}>
                {liabilities} <small>ETH</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <AccessTime /> updated {count} seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <InfoOutlined />
              </CardIcon>
              <p className={classes.cardCategory}>Total claims made</p>
              <h3 className={classes.cardTitle}>
                {totalClaims} <small>ETH</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <AccessTime /> updated {count} seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={{
                  labels: [],
                  series: [NAVArr]
                }}
                type="Line"
                options={formatChart(NAVArr)}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Solvency (Net Asset Value) {liabilities === '0' ? null : (Math.round(assets / liabilities * 100)) + "%"}</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated {count} seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={{
                  labels: [],
                  series: [assetsArr]
                }}
                type="Line"
                options={formatChart(assetsArr)}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Assets</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated {count} seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={{
                  labels: [],
                  series: [liabilitiesArr]
                }}
                type="Line"
                options={formatChart(liabilitiesArr)}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Liabilities</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated {count} seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <CustomTabs
            title=""
            headerColor="primary"
            tabs={[
              {
                tabName: "Roles",
                tabIcon: InfoOutlined,
                tabContent: (
                  <div>
                    <p>Use the MetaMask browser extension to sign-in and to access the functionalities available to each role. Request to become an admin is automatilcally granted for demo purposes. Other roles are required to be approved by an admin.</p>
                    <p>This prototype also demonstrates how the role based access control mechanism can operate in a decentralised autonomous insurance organistaion. They key lies in the design of the smart contract to balance and incetivise the desired behaviours from all stakeholders.</p>
                    <p>In a completely decentralised model, the admin role may not be necessary and the owner of the smart contract can also irreversibly rennouce their access rights so that the smart contract can be truely decentralised, indepdent and autonomous.
                      Instead of admins, the rules will be completely dictated by the transparent smart contract code once deployed and can be subject to external audits by its intended users before any commitment. </p>
                    <p>Less decentralised models may be more realistically achievable in the short term with the exisitng insurers play the role of the admin and oracle while providing improved transparency, efficiency and automation of the operations.</p>
                    <p>Also see some ideas for <a href="../admin/todo/">future improvements and enhancements.</a></p>
                  </div>
                )
              },
              {
                tabName: "Investor",
                tabIcon: AccountBalanceIcon,
                tabContent: (
                  <div>
                    <p>Investors can deposit assets (ETH) once their role has been approved by the admin and earn the right to withdrawal their share of the fund surplus in ETH, which arises if the policyholders do not fully claim their benefits.</p>
                    <p>The fund is coded to maintain between {contractBasis ? contractBasis.solvencyTarget : null}% and {contractBasis ? contractBasis.solvencyCeiling : null}% solvency. For simplicity, the defintion of solvency is excess assets over liabilities.
                    The investors are restricted to deposit more ETH if the solvency is above the ceiling of {contractBasis ? contractBasis.solvencyCeiling : null}% and any surplus above the solvency target of {contractBasis ? contractBasis.solvencyTarget : null}% will be distributed to the investors, proportionately to their deposit contributions, when a full valuation run is performed.</p>
                    <p>The investors also have the option to withdrawal the distrubted surplus, however for this demo, doing so will set their deposit contribution to zero and the fund will remove them from future surplus distributions i.e. they leave the fund until their next deposit.</p>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardBody>
                            {isInvestor ? <p>Account {accounts[0]} has already been accepted as an investor, send transaction with the desired investment value to invest.</p> : null}
                            {hasReqInvestor ? <p>Request to become an investor for {accounts[0]} has been submitted for community approval</p> : null}
                            {!isInvestor && !hasReqInvestor ? <p>Request to become an investor for {accounts[0]}</p> : null}
                          </CardBody>
                          <CardFooter stats>
                            <Button color="primary" disabled={isInvestor || hasReqInvestor ? true : false} onClick={() => requstRole('investor')}>Request</Button>
                            <Button color="primary" disabled={!isInvestor} onClick={invest}>Invest</Button>
                          </CardFooter>
                        </Card>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        {isInvestor ? <Card>
                          <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                              <AccountBalanceIcon />
                            </CardIcon>
                            <p className={classes.cardCategory}>Deposits</p>
                            <h3 className={classes.cardTitle}>
                              {invData.deposit} <small>ETH</small>
                            </h3>
                            <p className={classes.cardCategory}>Surplus (for withdrawal)</p>
                            <h3 className={classes.cardTitle}>
                              {invData.surplus} <small>ETH</small>
                            </h3>
                          </CardHeader>
                          <CardFooter stats>
                            <Button color="primary" onClick={invWithdrawal}>Withdrawal</Button>
                          </CardFooter>
                        </Card> : null}
                      </GridItem>
                    </GridContainer>
                  </div>
                )
              },
              {
                tabName: "Policyholder",
                tabIcon: AssignmentIcon,
                tabContent: (
                  <div>
                    <p>The policyholder can deposit ETH in return for a series of {contractBasis ? contractBasis.term : null} annuity payments once their role has been approved by the admin. </p>
                    <p>The policyholder will not be able to deposit ETH for the policy if the fund surplus (defined to be excess assets over liaiblities for simplicity) is insufficient to cover the valuation of additional liabilities of the new policy.</p>
                    <p>The payment of each annuity amount (deposit amount / annuity factor) are subject to the policyholders demonstrating they are active or alive. In this prototype, this can be achieved by signing into the relevant MetaMask wallet account and pressing the claim button within the required timeframe (currently {contractBasis ? contractBasis.payInterval * contractBasis.awolLimitTerm : null} seconds simulating {contractBasis ? contractBasis.awolLimitTerm : null} years since the previous claim). If the policy has not been claimed within the required time and a full valuation is performed then the policy is deemed to be terminated and any surplus is automatically distributed to the investors.</p>
                    <p>The annuity factor (currently {contractBasis ? contractBasis.a_x / 100 : null}) can be set by the oracles such that the policyholders are incentivised to earn an implict interest/inflation rate while reasonable for there to be a surplus distribution for the investors on average.</p>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardBody>
                            {isPolicyholder ? <p>Account {accounts[0]} has already been accepted as a policyholder, send transaction with the desired deposit value to receive annuity.</p> : null}
                            {hasReqPolicyholder ? <p>Request to become a policyhoder for {accounts[0]} has been submitted for community approval</p> : null}
                            {!isPolicyholder && !hasReqPolicyholder ? <p>Request to become a policyhoder for {accounts[0]}</p> : null}
                          </CardBody>
                          <CardFooter stats>
                            <Button color="primary" disabled={isPolicyholder || hasReqPolicyholder ? true : false} onClick={() => requstRole('policyholder')} >Request</Button>
                            <Button color="primary" disabled={!isPolicyholder} onClick={deposit}>Deposit</Button>
                          </CardFooter>
                        </Card>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        {isPolicyholder ? <Card>
                          <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                              <AssignmentIcon />
                            </CardIcon>
                            <p className={classes.cardCategory}>Policy deposit</p>
                            <h3 className={classes.cardTitle}>
                              {policyData.deposit} <small>ETH</small>
                            </h3>
                            <p className={classes.cardCategory}>Annuity amount</p>
                            <h3 className={classes.cardTitle}>
                              {policyData.payAmount} <small>ETH</small>
                            </h3>
                            <p className={classes.cardCategory}>Claimed amount</p>
                            <h3 className={classes.cardTitle}>
                              {policyData.totalClaimAmount} <small>ETH</small>
                            </h3>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={classes.stats}>
                              <Danger>
                                <Warning />
                              </Danger>
                              <a href="#pablo" onClick={e => e.preventDefault()}>
                                {policyData.payTermRemain} payment(s) remaining
                          </a>
                            </div>
                          </CardFooter>
                        </Card> : null}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        {isPolicyholder ? <Card>
                          <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                              <Icon>content_copy</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>Last claim time</p>
                            <h3 className={classes.cardTitle}>
                              {(new Date(policyData.lastClaimTime * 1000)).toUTCString().slice(-12)}
                            </h3>
                            <p className={classes.cardCategory}>Time left to claim</p>
                            <h3 className={classes.cardTitle}>
                              {Math.max(50 - (Math.floor(Date.now() / 1000) - policyData.lastClaimTime), 0)} <small>seconds</small>
                            </h3>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={classes.stats}>
                              <Button color="primary" onClick={policyClaim} disabled={policyData.payTermRemain === 0 ? true : false}>Claim</Button>
                            </div>
                          </CardFooter>
                        </Card> : null}
                      </GridItem>
                    </GridContainer>
                  </div>
                )
              },
              {
                tabName: "Admin",
                tabIcon: Cloud,
                tabContent: (
                  <div>
                    <p>For the purposes of the prototype demostration and better user experience, request to become an admin and subsequently an oracle is automatically granted.</p>
                    <p>The approval process is necessary to limit the possibilities of a DDoS attack. The process can also be used support a less decentralised model with tradiditonal underwriting processes.</p>
                    <Button color="primary" onClick={becomeAdmin}>Become admin</Button>
                    <Button color="primary" onClick={becomeOracle} disabled={!isAdmin}>Become Oracle</Button>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardBody>
                            <h4>Investor approvals</h4>
                            <Tasks
                              list={reqInvestorList}
                              onListChange={investorSelectorCb}
                            />
                          </CardBody>
                          <CardFooter stats>
                            <Button color="primary" disabled={(!isAdmin || !forApproveInvestor.length) ? true : false} onClick={() => grantRole('investor')}>Grant roles</Button>
                          </CardFooter>
                        </Card>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardBody>
                            <h4>Policyholder approvals</h4>
                            <Tasks
                              list={reqPolicyholderList}
                              onListChange={policyholderSelectorCb}
                            />
                          </CardBody>
                          <CardFooter stats>
                            <Button color="primary" disabled={(!isAdmin || !forApprovePolicyholder.length) ? true : false} onClick={() => grantRole('policyholder')}>Grant roles</Button>
                          </CardFooter>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  </div>
                )
              },
              {
                tabName: "Oracle",
                tabIcon: Cloud,
                tabContent: (
                  <Card>
                    <CardBody>
                      <p>One of the key roles of the oracle is to update the bases of the pricing and valuation of the contracts. It can be an exisiting insurance company or a decentralised network of parameter providers within or outside this risk fund. The oracle is also incentivised to grow the fund in order to receive up to the pre-defined fixed {contractBasis ? contractBasis.fee / 10000 : null}% nominal fee  {contractBasis ? "every " + contractBasis.payInterval + " seconds" : null} for the service provided.</p>
                      <p>The current annuity factor assumed is {contractBasis ? contractBasis.a_x / 100 : null}.</p>
                      <p>Increasing the annuity factor will result in a smaller payment for the policyholder (deposit / annuity factor) but lower liabilities generated as a result, the opposite applies for decreasing the annuity factor.</p>
                      <Button>Increase by 10%</Button>
                      <Button>Decrease by 10%</Button>
                      <p>Another role of the (decentralised) oracle network could be to perform a full valuation and distribute surplus as and when required. In this demo, this feature is open to the public i.e. anyone can perform this function at their own transaction expense however note that the executor is rewarded the oracle fee.</p>
                      <Button color="primary" onClick={runFullValuation}>Run full valuation </Button>
                    </CardBody>
                  </Card>
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
      <Snackbar
        place="bc"
        color="info"
        icon={AddAlert}
        message="Please approve the MetaMask transaction to continue or refresh the page after rejecting the transaction. Wait for the transaction to be verified by the network before making another request."
        open={sbar}
        closeNotification={() => setSbar(false)}
        close
      />
      <Backdrop className={classes.backdrop} open={bdOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
