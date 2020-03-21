var router = require('express').Router();

router.use('/', require('./bigchain'));
router.use('/', require('./biodata'));
router.use('/', require('./cpu'));

module.exports = router;
