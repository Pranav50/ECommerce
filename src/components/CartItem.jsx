import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './cartItemStyles'

const CartItem = ({item, onUpdateCartQty, onRemoveFromCart}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <hr/>
            <CardContent className={classes.cardContent}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions} >
                <div className={classes.buttons} style={{float: 'left'}}>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)} >-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)} >+</Button>
                </div>
                <IconButton onClick={() => onRemoveFromCart(item.id)} aria-label="Delete from cart" color="secondary" style={{float: 'right'}}>
                    <DeleteIcon  />
                </IconButton>
                {/* <Button variant="contained" type="button" color="secondary">Remove</Button> */}
            </CardActions>
        </Card>
    )
}

export default CartItem
