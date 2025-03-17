const express = require('express');
const router = express.Router();
const { controller } = require('../../controllers/getUserController/getUserController'); // Import correctly

router.route('/getUser').get(controller);

module.exports = router;
