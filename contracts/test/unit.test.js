const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
    developmentChains,
    networkConfig,
} = require("../helper-hardhat.config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Blend Unit Tests", () => {
          let horseNft,
              vrfCoordinatorV2Mock,
              entryFee,
              deployer,
              interval,
              user;
          const chainId = network.config.chainId;

          beforeEach(async () => {
              user = (await ethers.getSigners())[1];
              deployer = (await getNamedAccounts()).deployer;
              await deployments.fixture(["all"]);
              blendNft = await ethers.getContract("BlendNft", deployer);
          });

          it("should mint NFTs of different types with different metadata", async () => {
              // Mint NFTs of different types
              await blendNft.mint("https://red-ready-marlin-412.mypinata.cloud/ipfs/QmfLrQSyYLdTfw7ojGarRTP1TTSLTEgpZMT2iUzpYjkNYp");
              await blendNft.mint("https://red-ready-marlin-412.mypinata.cloud/ipfs/QmeaKXvbjjnttzu4ttAzjDQ2wHR97uCX84LyyAyLMtLagm");

              // Get token IDs of the minted NFTs
              const tokenId1 = await blendNft._tokenIds() - BigInt(1);
              const tokenId2 = await blendNft._tokenIds();

              // Get metadata of the minted NFTs
              const metadata1 = await blendNft.tokenURI(tokenId1);
              const metadata2 = await blendNft.tokenURI(tokenId2);
              
              // Check that the metadata of the two NFTs are different
              expect(metadata1).to.not.equal(metadata2);
          });
      });
