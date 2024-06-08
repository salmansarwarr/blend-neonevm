// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./RMRKMultiAsset.sol";
import "./RMRKSoulboundPerToken.sol";

contract MultiAsset is RMRKMultiAsset,RMRKSoulboundPerToken{
    uint64 tokenId = 1;
    uint64 assetId = 1;
    uint256 index = 0;
    function mint(string memory metadataURI,bool soulBound) public{
        _mint(msg.sender,tokenId);
        addAssets(tokenId,metadataURI);
        _setSoulbound(tokenId,!soulBound);
        tokenId++;
    }
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 token_id
    ) internal virtual override (RMRKSoulbound,RMRKMultiAsset) {
        if (!isTransferable(token_id, from, to))
            revert RMRKCannotTransferSoulbound();
    }
    function tokenCount() public view returns(uint64){
        return tokenId;
    }
    function getTokens()  public view returns(uint64 [] memory){
        uint64[] memory tokens = new uint64[] (tokenId-1);
        for(uint64 i = 1; i < tokenId;i++){
            tokens[i-1] = i;
        }
        return tokens;
    }
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(RMRKMultiAsset,RMRKSoulbound) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    function addAssets(uint64 token_id,string memory metadataURI) public {   
        address owner = ownerOf(token_id);
        require(owner == msg.sender,"only owner can add assets");   
        _addAssetEntry(assetId,metadataURI);
        _addAssetToToken(token_id,assetId,assetId);
        _acceptAsset(token_id,index,assetId);
        assetId++;
    }
}