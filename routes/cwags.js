const router = require ('express').Router();
const controller = require ('../controllers/cwags')


router.get('/', controller.getAll);

router.post('/', controller.createCwag);


router.put('/:id', controller.updateCwag);


router.delete('/:id', controller.deleteCwag);

module.exports = router