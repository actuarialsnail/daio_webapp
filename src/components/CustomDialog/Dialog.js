import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(props.open);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        View contract terms
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Contract terms
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Welcome, this prototype is a decentralised application (dapp) that you can use to interact with the underlying solidity smart contract deployed at <a href={"https://" + props.data.deployed_network + ".etherscan.io/address/" + props.data.deployed_addr}>this address</a> on the ethereum blockchain ({props.data.deployed_network} testnet). Please do not send any real ether to this contract.
          </Typography>
          <Typography gutterBottom>
            Details of the acronyms, technical terminologies and definitions used in the dapp are further explained <a href={"./Descriptions"}>here</a>.
          </Typography>
          <Typography gutterBottom>
            This dapp simulates the lifecycle of {props.data.term}-year fixed term life annuity proudcts in a fund with an interval of {props.data.payInterval} seconds representing 1 year. The fund is set up to maintain a solvency ratio between {props.data.solvencyTarget}% and {props.data.solvencyCeiling}% by automatically restricting new investments/policies and distributing surplus. All deposits by investors and policyholders have been standardised to 0.1 ETH for simplicity.
          </Typography>
          <Typography gutterBottom>
            The pricing and valuation annuity factors (currently set at {props.data.a_x / 100}) have been assumed to be the same for simplicity. For example, an annuity factor of 15.38 is the present value of all 30 future payments discounted with an interest rate of 5% per time interval. The (decentralised) oracle will be able to update the bases for a fixed nominal fee based on the size of the fund.
          </Typography>
          <Typography gutterBottom>
            Using the installed MetaMask extension - you can explore the role of investors, policyholders, administrators and oracles in this decentralised ecosystem.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Let's explore
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}