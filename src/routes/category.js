const express = require('express');
const { requireSignin, adminMiddlewear } = require('../common-middlewear');
const { addCategory, getCategories } = require('../controller/category');
const router = express.Router();


router.post('/category/create', requireSignin , adminMiddlewear ,addCategory );
router.get('/category/getCategory', getCategories );


module.exports = router;