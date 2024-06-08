// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Storage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlendNft is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter public _tokenIds;

    event NFTMinted(address indexed owner, uint256 indexed tokenId);

    mapping(address => uint) _mintCount;

    string _uri =
        "https://gateway.pinata.cloud/ipfs/QmUDnBmE9nUZAVPpA95nvwXczT7hTvmdD2AiwbQumSYjwB"; //4Body7Background1.png

    constructor() ERC721("Avalanche Blend", "FACE") {}

    function mint(string memory ipfsUri) public {
        _uri = ipfsUri;

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mintCount[_msgSender()] += 1;
        _safeMint(_msgSender(), newItemId);
        _setTokenURI(newItemId, _uri);
        emit NFTMinted(_msgSender(), newItemId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
