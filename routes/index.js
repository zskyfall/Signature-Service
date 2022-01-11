var express = require('express');
const { postGetSignature, postRecoverSigner } = require('../controller/SignatureController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Signature Service API' });
});

router.post('/get-signature', postGetSignature);

router.post('/recover-signer', postRecoverSigner);

module.exports = router;