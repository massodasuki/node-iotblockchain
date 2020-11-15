var router = require('express').Router();

router.use('/', require('./bigchain'));
router.use('/', require('./biodata'));
router.use('/', require('./cpu'));
router.use('/', require('./direct'));

module.exports = router;
