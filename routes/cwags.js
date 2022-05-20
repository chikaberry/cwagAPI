const router = require ('express').Router();
const controller = require ('../controllers/cwags')


router.get('/', controller.getAll);

router.post('/', controller.createCwag);



module.exports = router