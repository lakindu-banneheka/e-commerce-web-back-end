const Cart = require('../models/cart')

exports.addItemToCart = (req,res) => {

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){
            // if cart already exist then update card quantity
            const reqProduct = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == reqProduct );
            let condition, update;
            if(item){
                condition = { "user":req.user._id , "cartItems.product": reqProduct };
                update = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                };
            }else{
                condition = { user:req.user._id };
                update = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                };
            }
            Cart.findOneAndUpdate(condition, update)
            .exec((error, _cart) => {
                if(error) return res.status(400).json({ error });
                if(_cart){
                    return res.status(201).json({ _cart });
                }
            })
        } else {
            const cart = new Cart({
            // if cart not exist then create a cart
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error });
                if(cart) {
                    return res.status(201).json({ cart });
                }
            })
        }
    })

   
}