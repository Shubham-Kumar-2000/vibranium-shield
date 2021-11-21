const express = require('express');
const { fingerprinter } = require('../helpers/fingerprinter');
const { validation } = require('../validations');
const router = express.Router();

/* GET home page. */
router.post('/', validation, fingerprinter, function (req, res) {
    res.status(200).json({ err: false, fingerprint: req.fingerprint });
});

module.exports = router;
