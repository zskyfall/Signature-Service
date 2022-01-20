var express = require('express');
const { postGetSignature, postRecoverSigner, postSignPayment, postVerifySignature, getTransaction } = require('../controller/SignatureController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Signature Service API' });
});

router.post('/get-signature', postGetSignature);

router.post('/recover-signer', postRecoverSigner);

router.post('/verify-signature', postVerifySignature);

router.post('/sign-payment', postSignPayment);

module.exports = router;