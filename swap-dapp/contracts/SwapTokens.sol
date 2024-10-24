// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;
import {IERC20} from "./IToken.sol";

contract SwapToken {
    // create an interface of both token and s global state for the exchangerate
    IERC20 public baseToken;
    IERC20 public celoToken;
    uint256 public exchangeRate;

    event SwapBase(
        address indexed user,
        uint256 baseAmount,
        uint256 celoAmount
    );
    event SwapCelo(
        address indexed user,
        uint256 celoAmount,
        uint256 baseAmount
    );

    event TokensDeposited(
        address indexed depositor,
        uint256 baseAmount,
        uint256 celoAmount
    );

    // construtor args [baseToken and celoToken contract addresses, xchange rate which give base more value than celo --> 1 Base = 2 Celo, 1 Celo = 0.5 Base]
    constructor(address _baseToken, address _celoToken, uint256 _exchangeRate) {
        baseToken = IERC20(_baseToken);
        celoToken = IERC20(_celoToken);
        exchangeRate = _exchangeRate;
    }

    // To ensure that the contract doesn't run out of both tokens
    function depositTokens(uint256 baseAmount, uint256 celoAmount) public {
        baseToken.transferFrom(msg.sender, address(this), baseAmount);
        celoToken.transferFrom(msg.sender, address(this), celoAmount);

        emit TokensDeposited(msg.sender, baseAmount, celoAmount);
    }

    function swapBaseToCelo(uint256 _amount) public {
        require(msg.sender != address(0), "Not allowed");
        uint256 celoAmount = _amount * exchangeRate; // exchanging 2 Base with 2 as exchange rate will be 2 * 2 = 4 Celo
        require(
            celoToken.balanceOf(address(this)) >= celoAmount,
            "Not enough Celo Token"
        ); // There should be enough token to be swapped

        require(baseToken.approve(address(this), _amount), "Token approved");

        require(
            baseToken.transferFrom(msg.sender, address(this), _amount),
            "Base transfer failed"
        );

        require(
            celoToken.transfer(msg.sender, celoAmount),
            "Celo transfer failed"
        );
        emit SwapBase(msg.sender, _amount, celoAmount);
    }

    function swapCeloToBase(uint256 _amount) public {
        require(msg.sender != address(0), "Not allowed");

        uint256 baseAmount = _amount / exchangeRate; // exchanging 2 Celo with 2 as exchange rate will be 2 / 2 = 1 Base
        require(
            baseToken.balanceOf(address(this)) >= baseAmount,
            "Not enough Base amount"
        ); // There should be enough token to be swapped

        require(celoToken.approve(address(this), _amount), "Token approved");

        require(
            celoToken.transferFrom(msg.sender, address(this), _amount),
            "Celo transfer failed"
        );

        require(
            baseToken.transfer(msg.sender, baseAmount),
            "Base transfer failed"
        );
        emit SwapCelo(msg.sender, _amount, baseAmount);
    }

    function getBaseBalance(
        address _baseToken
    ) external view returns (uint256) {
        uint256 bal = IERC20(_baseToken).balanceOf(address(this));

        return bal;
    }

    function getCeloBalance(
        address _celoToken
    ) external view returns (uint256) {
        uint256 bal = IERC20(_celoToken).balanceOf(address(this));

        return bal;
    }
}

//  The require() statement is to ensure txn validity, manage errors effectively while ensuring that the contract behaves as expected and protecting it from unexpected situations.
