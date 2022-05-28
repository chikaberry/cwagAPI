const router = require ('express').Router();
const controller = require ('../controllers/cwags')
const validator = require ('../utils/middleware')

router.get('/', controller.getAll);

router.post('/', validator.cwagSecurity, controller.createCwag);


router.put('/:id', validator.cwagSecurity, controller.updateCwag);


router.delete('/:id', controller.deleteCwag);

module.exports = router