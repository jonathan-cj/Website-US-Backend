const { Router } = require('express');
const { route } = require('express/lib/application');
const controller = require('../controllers/LineupController');

const router = Router();

router.get('/boys', controller.fetchBoysLineup);
router.get('/girls', controller.fetchGirlsLineup);

module.exports = router;
