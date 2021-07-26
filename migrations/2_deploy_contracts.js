var MyERC721 = artifacts.require("MyERC721");
var constants = require('../test/Constants.js');

module.exports = function (deployer, network, accounts) {
    // deploy NFT
    constants.contractOwner = accounts[0]
    deployer.deploy(MyERC721, constants.tokenName, constants.tokenSymbol);
}