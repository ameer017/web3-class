// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./DltToken.sol";

contract ClaimFaucet is DltToken {
    uint256 public constant CLAIMABLE_AMOUNT = 10;

    struct User {
        uint256 lastClaimedTime;
        uint256 totalClaimed;
    }

    mapping(address => User) public users;
    mapping(address => bool) hasClaimedBefore;
    event Claimed(
        address indexed user,
        uint256 amountClaimed,
        uint256 duration
    );

    constructor(
        string memory _name,
        string memory _symbol
    ) DltToken(_name, _symbol) {}

    function claimToken() public {
        require(msg.sender != address(0), "Zero adress now allowed");

        if (hasClaimedBefore[msg.sender]) {
            User storage userInfo = users[msg.sender];
            require(
                block.timestamp >= userInfo.lastClaimedTime + 1 days,
                "You can claim once in 24 hours!"
            );

            userInfo.lastClaimedTime = block.timestamp;
            userInfo.totalClaimed += CLAIMABLE_AMOUNT;

            mint(CLAIMABLE_AMOUNT, msg.sender);

            emit Claimed(msg.sender, CLAIMABLE_AMOUNT, block.timestamp);
        } else {
            hasClaimedBefore[msg.sender] = true;
            mint(CLAIMABLE_AMOUNT, msg.sender);

            User memory currentUser;
            currentUser.lastClaimedTime = block.timestamp;
            currentUser.totalClaimed = CLAIMABLE_AMOUNT;
            emit Claimed(msg.sender, CLAIMABLE_AMOUNT, block.timestamp);
        }
    }

    function getUserData() external view returns (uint256, uint256) {
        User memory currentUser = users[msg.sender];

        return (currentUser.lastClaimedTime, currentUser.totalClaimed);
    }
}
