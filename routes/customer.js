const router = require ('express').Router();
const customer = require ('../controllers/customer')
const validation = require ('../utils/middleware')
const { requiresAuth } = require('express-openid-connect');




router.get('/', customer.getAll);

router.post('/',  validation.customerSecurity, customer.createCustomer);

router.put('/:id',  validation.customerSecurity, customer.updateCustomer);

router.delete('/:id',  customer.deleteCustomer);


module.exports = router

