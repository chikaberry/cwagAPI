const router = require ('express').Router();
const controller = require ('../controllers/cwags')
const customer = require ('../controllers/customer')
const validator = require ('../utils/middleware')
const { requiresAuth } = require('express-openid-connect')

router.get('/', controller.getAll);

router.post('/', requiresAuth(),validator.cwagSecurity, controller.createCwag);


router.put('/:id', requiresAuth(),validator.cwagSecurity, controller.updateCwag);


router.delete('/:id', requiresAuth(),controller.deleteCwag);


//customer




module.exports = router