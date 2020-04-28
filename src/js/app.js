
App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',

    init: function() {
        return App.initWeb3();
    }
};

let currentChainId = null;
ethereum.send('eth_chainId')
    .then(handleChainChanged);

ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(chainId) {

    if (currentChainId !== chainId) {

        currentChainId = chainId;
    }
}

let currentAccount = null;
ethereum.send('eth_accounts')
    .then(handleAccountsChanged)
    .catch(err => {
        if (err.code === 4100) {
            console.log('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
    });

ethereum.on('accountsChanged', handleAccountsChanged);

function handleAccountsChanged(accounts) {

    if (accounts.length === 0) {

        console.log('Please connect to MetaMask.');

    } else if (accounts[0] !== currentAccount) {

        currentAccount = accounts[0];
        document.getElementById('connectButton', connect);
    }
}


$(function() {
    $(window).load(function() {
        App.init();
    });
});