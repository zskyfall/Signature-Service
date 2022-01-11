// const Web3 = require('web3');
// const BSC_TESTNET_HTTP_PROVIDER = "https://data-seed-prebsc-1-s1.binance.org:8545/";
// const web3 = new Web3(new Web3.providers.HttpProvider(BSC_TESTNET_HTTP_PROVIDER));
var defaultAccount;

async function setDefaultAccount(web3, _privateKey) {
    // This privateKey is only used for testing
    //const privateKey = 'e0f3440344e4814d0dea8a65c1b9c488bab4295571c72fb879f5c29c8c861937';
    const account = await web3.eth.accounts.privateKeyToAccount('0x' + _privateKey);
    await web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;
    defaultAccount = web3.eth.defaultAccount;
    console.log("set default account succeed!");
}

async function createNewAccount() {
    let account = await web3.eth.accounts.create();
    return account;
}

function getDefaultAccount() {
    return defaultAccount;
}

module.exports = {
    getDefaultAccount: getDefaultAccount,
    setDefaultAccount: setDefaultAccount,
    createNewAccount: createNewAccount
}