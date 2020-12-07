import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import React from 'react'

import useStyles from './productStyles'

const Product = ({product, onAddToCart}) => {

    const classes = useStyles()

    const styles = {
        media: {
          height: 20,
        }
       };

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} title={product.name} >
                <img style={{height:'200px'}} src={product.media.source} />
                </CardMedia>
                <hr/>
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom> 
                            {product.name}
                        </Typography><br/>
                        
                    </div> 
                    <Typography variant="h6"> 
                            {product.price.formatted_with_symbol}
                    </Typography>
                    <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" />
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                            <AddShoppingCart/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product
