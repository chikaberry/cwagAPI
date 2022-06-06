const router = require ('express').Router();
const controller = require ('../controllers/cwags')
const customer = require ('../controllers/customer')
const validator = require ('../utils/middleware')

router.get('/', controller.getAll);

router.post('/', validator.cwagSecurity, controller.createCwag);


router.put('/:id', validator.cwagSecurity, controller.updateCwag);


router.delete('/:id', controller.deleteCwag);


//customer


router.get('/', customer.getAll);

router.post('/', validator.cwagSecurity, customer.createCustomer);

router.put('/:id', validator.cwagSecurity, customer.updateCustomer);

router.delete('/:id', validator.cwagSecurity, customer.deleteCustomer);


module.exports = router