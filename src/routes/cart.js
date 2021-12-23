const express = require('express');
const { requireSignin, userMiddlewear } = require('../common-middlewear');
const { addItemToCart } = require('../controller/cart');
const router = express.Router();


router.post('/user/cart/add-to-cart', requireSignin , userMiddlewear , addItemToCart );


module.exports = router;