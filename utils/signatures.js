const abi = require('ethereumjs-abi');
const fs = require('fs');
const SignatureController = require('../controller/SignatureController');

//config
//config data
let rawdata = fs.readFileSync('./config/config.json');
let config = JSON.parse(rawdata);

async function signPayment(web3, recipient, amount, nonce, contractAddress) {
    var hash = web3.utils.soliditySha3(recipient, amount, nonce, contractAddress);
    hash = "hihihoho" + hash;
    hash = hash.toString("hex");

    var prefixedHash = web3.utils.soliditySha3("\x19Ethereum Signed Message:\n", hash);
    // var hashedMessage = web3.utils.sha3(prefixedHash);
    // var hashedMessage2 = web3.utils.sha3(hash);

    let privateKey = config.PRIVATE_KEY;

    console.log("Hash: " + hash);
    console.log("Prefixed hash: " + prefixedHash);

    // let signature = await web3.eth.personal.sign(prefixedHash, web3.eth.defaultAccount, privateKey);
    let signature = web3.eth.accounts.sign(hash, privateKey);
    const prefix = "\x19Ethereum Signed Message:\n";
    const mess = signature.message;

    return signature;
}

async function recoverSigner(web3, _message, _signature) {
    let signer = await web3.eth.accounts.recover(_message, _signature);
    return signer;
}
module.exports = {
    signPayment: signPayment,
    recoverSigner: recoverSigner
}