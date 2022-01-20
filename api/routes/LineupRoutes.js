const { Router } = require('express');
const controller = require('../controllers/LineupController');

const router = Router();

router.get('/boys', controller.fetchBoysLineup);

module.exports = router;
