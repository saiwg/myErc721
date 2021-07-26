const MyERC721 = artifacts.require("MyERC721");
var constants = require('./Constants.js');

contract('MyERC721', (accounts) => {
  it('Token deploy test', async () => {
    const tokenInst = await MyERC721.deployed();
    console.log("Token contract address: " + tokenInst.address);

    assert.equal(await tokenInst.name(), constants.tokenName, "Token's name should be " + constants.tokenName);
    assert.equal(await tokenInst.symbol(), constants.tokenSymbol, "Token's symbol should be " + constants.tokenSymbol);
    assert.equal(await tokenInst.totalSupply(), 0, "Token total supply should be " + 0);
    assert.equal(await tokenInst.owner(), constants.contractOwner, "Token contract's owner should be " + constants.contractOwner);

    assert.equal(await tokenInst.supportsInterface("0x01ffc9a7"), true, "Token should be supports IERC165-Interface: 0x01ffc9a7");
    assert.equal(await tokenInst.supportsInterface("0x80ac58cd"), true, "Token should be supports IERC721-Interface: 0x80ac58cd");
    assert.equal(await tokenInst.supportsInterface("0x5b5e139f"), true, "Token should be supports IERC721Metadata-Interface: 0x5b5e139f");
    assert.equal(await tokenInst.supportsInterface("0x780e9d63"), true, "Token should be supports IERC721Enumerable-Interface: 0x780e9d63");

    assert.equal(await tokenInst.balanceOf(constants.contractOwner), 0, "Token owner balance should be " + 0);

    var err = null;
    try {
      await tokenInst.ownerOf(0)
    } catch (error) {
      console.log(error.message);
      err = error;
    }
    assert.equal(err.message, "Returned error: VM Exception while processing transaction: revert ERC721: owner query for nonexistent token", "Token should not be exists");
  });
});
