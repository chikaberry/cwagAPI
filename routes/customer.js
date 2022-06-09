const router = require ('express').Router();
const customer = require ('../controllers/customer')
const validation = require ('../utils/middleware')
const { requiresAuth } = require('express-openid-connect');




router.get('/', customer.getAll);

router.post('/', requiresAuth(),validation.customerSecurity, customer.createCustomer);

router.put('/:id', requiresAuth(),validation.customerSecurity, customer.updateCustomer);

router.delete('/:id', requiresAuth(),validation.customerSecurity, customer.deleteCustomer);


module.exports = router

