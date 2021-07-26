// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyERC721 is Ownable, ERC721Enumerable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;
    
    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
    }


    function mint(address to, string memory tokenUri) public {
        require(bytes(tokenUri).length > 0, "MyERC721: tokenUri shoud not be null");
        uint256 newTokenId = _tokenIdTracker.current();
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenUri);
        _tokenIdTracker.increment();
    }

    function burn(uint256 tokenId) public {
        require(_exists(tokenId), "MyERC721: Burn of nonexistent token");
        _burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "MyERC721: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId), "MyERC721: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }
}
