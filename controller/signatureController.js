const fs = require('fs');
const Web3 = require('web3');
//const ethereumJsUtil = require('ethereumjs-util');
const {
    bufferToHex,
    ecrecover,
    fromRpcSig,
    hashPersonalMessage,
    publicToAddress,
    toBuffer,
    fromAscii,
} = require('ethereumjs-util');
const { getDefaultAccount, setDefaultAccount } = require('../utils/accouns');
const { signPayment, recoverSigner } = require('../utils/signatures');
const BSC_TESTNET_HTTP_PROVIDER = "https://data-seed-prebsc-1-s1.binance.org:8545/";

//config data
let rawdata = fs.readFileSync('./config/config.json');
let config = JSON.parse(rawdata);

//constants
const RESPONSE_STATUS_SUCCESS = "success";
const RESPONSE_STATUS_FAIL = "fail";
const RESPONSE_STATUS_ERROR = "error";
const STATUS_FAIL_MESSAGE = "Parameters missmatch!";

const web3 = new Web3(new Web3.providers.HttpProvider(BSC_TESTNET_HTTP_PROVIDER));

let postGetSignature = async function(req, res) {
    var { user_address, amount, nonce, timestamp } = req.body;

    if (amount && nonce && timestamp) {
        //this private key is only used for testing -- wallet address: 0x0bC3c9A6955eA07833Dc627c2E1E5bcb62366531
        const privateKey = config.PRIVATE_KEY;
        await setDefaultAccount(web3, privateKey);

        let message = amount + nonce + timestamp;

        message = message.toString();
        console.log("message: " + message);
        //const sig = await web3.eth.accounts.sign(message, address);
        try {
            // Hashing first makes a few things easier.
            var hashMessage = web3.utils.sha3(message);
            console.log("hash message: " + hashMessage);
            let defaultAccount = getDefaultAccount();
            const sign = await web3.eth.sign(hashMessage, defaultAccount);

            res.json({ status: RESPONSE_STATUS_SUCCESS, signature: sign });
        } catch (err) {
            console.log(err);
            res.json({ status: RESPONSE_STATUS_ERROR, error: err });
        }
    } else {
        res.json({ status: RESPONSE_STATUS_FAIL, error: STATUS_FAIL_MESSAGE });
    }
}

let postSignPayment = async function(req, res) {
    var { recipient, amount, nonce, address } = req.body;

    if (recipient && amount && nonce) {
        //this private key is only used for testing -- wallet address: 0x0bC3c9A6955eA07833Dc627c2E1E5bcb62366531
        const privateKey = config.PRIVATE_KEY;
        await setDefaultAccount(web3, privateKey);

        try {
            //const sign = await web3.eth.sign(hashMessage, defaultAccount);

            const sign = await signPayment(web3, recipient, amount, nonce, address);

            res.json({ status: RESPONSE_STATUS_SUCCESS, signature: sign });
        } catch (err) {
            console.log(err);
            res.json({ status: RESPONSE_STATUS_ERROR, error: err });
        }
    } else {
        res.json({ status: RESPONSE_STATUS_FAIL, error: STATUS_FAIL_MESSAGE });
    }
}

let postRecoverSigner = async function(req, res) {
    var { message, signature } = req.body;
    if (message && signature) {
        var hashMessage = web3.utils.sha3(message);
        let _signer = await recoverSigner(web3, hashMessage, signature);

        res.json({ status: RESPONSE_STATUS_SUCCESS, signer: _signer });
    } else {
        res.json({ status: RESPONSE_STATUS_FAIL, error: STATUS_FAIL_MESSAGE });
    }
}

let postVerifySignature = async function(req, res) {
    var { message, signature } = req.body;
    try {
        let signer = await recoverSigner(web3, message, signature);

        const privateKey = config.PRIVATE_KEY;
        await setDefaultAccount(web3, privateKey);
        let defaultAccount = getDefaultAccount();
        console.log("Default account: " + defaultAccount);
        console.log("Signer: " + signer);
        res.json({ status: RESPONSE_STATUS_SUCCESS, isVerified: signer == defaultAccount ? true : false });
    } catch (e) {
        console.log(e);
        res.json({ status: RESPONSE_STATUS_FAIL, error: e });
    }
}

module.exports = {
    postGetSignature: postGetSignature,
    postRecoverSigner: postRecoverSigner,
    postSignPayment: postSignPayment,
    postVerifySignature: postVerifySignature
};