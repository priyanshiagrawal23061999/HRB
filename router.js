const express = require('express');

const router = express.Router();

const app = express()
const userRoute = require('./routes/user.routes')
const authRoute = require('./routes/auth.routes')
const hrRolesRoute = require('./routes/HrRoles.routes')
const menuMasterRoute = require('./routes/menuMaster.routes')
const eventCalendarRoute = require('./routes/event-calendar.routes')
const requirementStructureRoute = require('./routes/requirement-structure.routes')
const training = require('./routes/training.routes')
const orgsStruct = require('./routes/orgsStruct.routes')


router.use('/test', userRoute);
router.use('/auth', authRoute);
router.use('/hrroles', hrRolesRoute)
router.use('/menuMaster', menuMasterRoute)
router.use('/eventCalendar', eventCalendarRoute)
router.use('/requirementStructure', requirementStructureRoute)
router.use('/training', training)
router.use('/orgsStruct', orgsStruct)


module.exports = router