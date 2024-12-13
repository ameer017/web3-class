// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CeloDaoMarketPlace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    uint256 public listingPrice = 0.0025 ether;
    address payable owner;
    mapping(uint256 => MarketItem) public idToMarketItem;
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool isSold;
    }
    event MarketItemCreated(
        address indexed owner,
        address indexed seller,
        uint256 tokenId,
        uint256 price
    );

    constructor() ERC721("CELOAFRICADAO", "CAD") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint256 _newPrice) public {
        listingPrice = _newPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory _tokenURI, uint256 _price)
        public
        payable
        returns (uint256)
    {
        uint256 _id = _tokenIds.current();
        _mint(msg.sender, _id);
        _setTokenURI(_id, _tokenURI);
        createMarketItem(_id, _price);
        _tokenIds.increment();
        return _id;
    }

    function createMarketItem(uint256 _tokenId, uint256 _price) private {
        require(_price > 0, "can't be zero");
        require(msg.value == listingPrice, "less amount");
        idToMarketItem[_tokenId] = MarketItem({
            tokenId: _tokenId,
            owner: payable(address(this)),
            seller: payable(msg.sender),
            price: _price,
            isSold: false
        });
        _transfer(msg.sender, address(this), _tokenId);
        payable(owner).transfer(listingPrice);
        emit MarketItemCreated(msg.sender, address(0), _tokenId, _price);
    }

    function resaleToken(uint256 _tokenId, uint256 _newPrice) public payable {
        require(idToMarketItem[_tokenId].owner == msg.sender, "not owner");
        require(
            msg.value == listingPrice,
            "price must be equal to listing price"
        );
        MarketItem storage item = idToMarketItem[_tokenId];
        item.price = _newPrice;
        item.seller = payable(msg.sender);
        item.owner = payable(address(this));
        item.isSold = false;
        _transfer(msg.sender, address(this), _tokenId);
        _itemsSold.decrement();
        payable(owner).transfer(listingPrice);
    }

    /***
     * @notice allows an existing token to be sold
     * @param _tokenId the NFT to be sold
     * @dev requires the msg.sender to pay for the nft which is sent back to the initial seller
     */
    function createMarketSale(uint256 _tokenId) public payable {
        //Take the price  from the idToMarketItem mapping using the _tokenId
        //check if the msg.value is equal to the price **the msg.value is the price thats need to be paid by the buyer which was set by the nft seller
        //make the owner of the nft the msg.sender that is anyone calling this function
        //make the seller to be address(0) since its not up for sale
        //make isSold for the nft to be true
        //increment _itemSold
        //send the native currency thats the price to the seller of that nft

        MarketItem storage marketSale = idToMarketItem[_tokenId];
        require(msg.value == marketSale.price, "Insufficient funds sent");

        marketSale.owner = payable(msg.sender);

        address payable seller = marketSale.seller;

        marketSale.seller = payable(address(0));

        marketSale.isSold = true;

        _itemsSold.increment();

        seller.transfer(msg.value);

        _transfer(address(this), msg.sender, _tokenId);
    }

    /****
     * @notice this function is used to get all nfts that are up for sale in the market place
     * @dev returns all the nfts that are owned by the marketplace on be half of sellers which returns an array of MArketItem[]
     */
    function fetchMarketPlaceItems()
        public
        view
        returns (MarketItem[] memory items)
    {
        //get the total counts of all the nfts that have been sold * HINT -> _tokenIds.current()
        //get the difference between all the ntfs that have been minted aganist those that have been sold *HINT (_tokenIds.current()-_itemsSold.current())
        //create a fixed size array of the unsold nfts
        //Hint
        //items = new MarketItem[]((_tokenIds.current()-_itemsSold.current()));
        //initialise an index to store nfts that are unsold
        //HINT
        // uint256 index=0;
        //Perform a loop "for loop" to check if the owner at that index is the address(this) thats the market place

        uint256 totalItems = _tokenIds.current();
        uint256 unsoldItemCount = totalItems - _itemsSold.current();
        uint256 currentIndex = 0;

        items = new MarketItem[](unsoldItemCount);

        for (uint256 i = 0; i < totalItems; i++) {
            if (idToMarketItem[i].owner == address(this)) {
                items[currentIndex] = idToMarketItem[i];
                currentIndex++;
            }
        }
    }

    function fetchUserNFTS(address _user)
        public
        view
        returns (MarketItem[] memory items)
    {
        uint256 itemCount = _tokenIds.current();
        uint256 userItems = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i].seller == _user) {
                userItems++;
            }
        }
        items = new MarketItem[](userItems);
        uint256 index = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i].seller == _user) {
                items[index] = idToMarketItem[i];
                index++;
            }
        }
    }
}
