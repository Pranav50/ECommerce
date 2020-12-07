import { Button, CssBaseline, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import AddressForm from './AddressForm'
import PaymentDetails from './PaymentForm'
import {Link, useHistory} from 'react-router-dom'
import useStyles from './checkoutStyles'
import { commerce } from '../lib/commerce'
import PaymentForm from './PaymentForm'
import Spinner from './Spinner'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();
  
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  
    useEffect(() => {
      if (cart.id) {
        const generateToken = async () => {
          try {
            const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
  
            setCheckoutToken(token);
          } catch {
            if (activeStep !== steps.length) history.push('/');
          }
        };
  
        generateToken();
      }
    }, [cart]);
  
    const next = (data) => {
      setShippingData(data);
  
      nextStep();
    };
  
    let Confirmation = () => (order.customer ? (
      <>
        <div>
          <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <Spinner />
      </div>
    ));
    if (error) {
      Confirmation = () => (
        <>
          <Typography variant="h5">Error: {error}</Typography>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      );
    }
    const Form = () => (activeStep === 0
      ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} next={next} />
      : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);
    return (
      <>
        <CssBaseline />
        <div className={classes.toolbar} />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
          </Paper>
        </main>
      </>
    );
  };
  export default Checkout;
