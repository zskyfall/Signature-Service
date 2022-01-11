const Web3 = require('web3');
const ethereumJsUtil = require('ethereumjs-util');
const BSC_TESTNET_HTTP_PROVIDER = "https://data-seed-prebsc-1-s1.binance.org:8545/";

const web3 = new Web3(new Web3.providers.HttpProvider(BSC_TESTNET_HTTP_PROVIDER));
let postSignRequest = async function(req, res) {

}

let getSignRequest = async function(req, res) {

}

let getSignature = async function(req, res) {

}

()
module.exports = {
    getSignRequest: getSignRequest,
    postSignRequest: postSignRequest
};