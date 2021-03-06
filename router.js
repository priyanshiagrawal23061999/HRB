const express = require('express');

const router = express.Router();

const app = express()
const userRoute = require('./routes/user.routes')
const authRoute = require('./routes/auth.routes')
const hrRolesRoute = require('./routes/HrRoles.routes')
const menuMasterRoute = require('./routes/menuMaster.routes')
const eventCalendarRoute = require('./routes/event-calendar.routes')


router.use('/test', userRoute);
router.use('/auth', authRoute);
router.use('/hrroles', hrRolesRoute)
router.use('/menuMaster', menuMasterRoute)
router.use('/eventCalendar', eventCalendarRoute)


module.exports = router