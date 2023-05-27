pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PartialPrivateCollectibles is ERC721, Ownable {
    string private baseURI__;
    address public minterAddress;
    bool public minting;

    using Counters for Counters.Counter;
    Counters.Counter private tokenIdCounter;

    modifier onlyMinter {
        require(msg.sender == minterAddress);
        _;
    }

    constructor(string memory name, string memory symbol, address minterAddress_) ERC721(name, symbol) {
        setMinter(minterAddress_);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId, ".json")) : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI__;
    }

    function setBaseURI(string memory baseURI_) onlyMinter public {
        if(!minting) minting = true;
        baseURI__ = baseURI_;
    }

    function setMinter(address minterAddress_) onlyOwner public {
        minterAddress = minterAddress_;
    }

    function collectNFT(address address_, string memory baseURI) onlyMinter external {
        require(minting, "Collecting: The collecting has closed");
        setBaseURI(baseURI);
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(address_, tokenId);
    }

    function privateTransferFrom(address to_, address from_, uint id_, string memory baseURI) onlyMinter external {
        setBaseURI(baseURI);
        IERC721(address(this)).approve(address(this), id_);
        IERC721(address(this)).safeTransferFrom(from_, to_, id_);
    }

    function totalSupply() external view returns (uint256) {
        return tokenIdCounter.current();
    }

    function setMinting(bool isMinting) onlyOwner external {
        minting = isMinting;
    }
}