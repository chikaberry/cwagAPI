const router = require ('express').Router();

router.use('/cwags', require('./cwags'))
//router.use('/swagger', require('./swagger'))
// router.use('/', (req, res) => {
//     res.send('working');
// });

module.exports = router;