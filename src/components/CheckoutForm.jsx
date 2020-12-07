import { Button, CircularProgress, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React from 'react'

import useStyles from './checkoutFormStyles'

const steps = ['Shipping Address', 'Payment Details']

const CheckoutForm = () => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0)
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step) => {
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            })
                        }
                    </Stepper>
                </Paper>
            </main>
        </>
    )
}

export default CheckoutForm
