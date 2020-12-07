
import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CartItem from './CartItem';
import { Link } from 'react-router-dom'

import useStyles from './cartStyles'

const Cart = ({cart, handleUpdateCartQty, handleEmptyCart, handleRemoveFromCart}) => {
    const classes = useStyles();
    //const isEmpty = !cart.line_items.length;

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your cart <br/>
            <Link to="/" className={classes.link}>Start adding some items</Link>
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3} style={{marginTop:'1.5rem'}}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                        {/* <h2>{item.name}</h2>
                        <img src={item.media.source} /> */}
                    </Grid>
                    ))}
            </Grid>
            <div className={classes.cartDetails} style={{marginTop:'2.5rem'}}>
                <Typography variant="h4" style={{float:'left'}}>Subtotal: {  cart.subtotal.formatted_with_symbol }</Typography>
                <span style={{float:'right'}}>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </span>
            </div>
        </>
    )

    if(!cart.line_items) return 'Loading...' 

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart
