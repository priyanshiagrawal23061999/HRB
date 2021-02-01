const express = require('express');

const router = express.Router();

const app = express()
const userRoute = require('./routes/user.routes')
const authRoute = require('./routes/auth.routes')


router.use('/test', userRoute);
router.use('/auth', authRoute);



module.exports = router