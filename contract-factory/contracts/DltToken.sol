// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract DltToken {
    string public tokenName;
    string public tokenSymbol;
    uint256 public totalSupply;
    uint8 public constant decimals = 18;
    address public owner;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allow;

    constructor(string memory _name, string memory _symbol) {
        tokenName = _name;
        tokenSymbol = _symbol;
        owner = msg.sender;
        mint(1_000_000 * (10 ** decimals), owner);
    }

    event Transfer(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 amount
    );

    function balanceOf(address _address) external view returns (uint256) {
        return balances[_address];
    }

    function transfer(
        address _receiver,
        uint256 _amountOfToken
    ) external returns (bool) {
        require(_receiver != address(0), "Receiver address cannot be zero");
        require(_amountOfToken <= balances[msg.sender], "Insufficient balance");

        balances[msg.sender] -= _amountOfToken;
        balances[_receiver] += _amountOfToken;

        emit Transfer(msg.sender, _receiver, _amountOfToken);
        return true;
    }

    function approve(
        address _delegate,
        uint256 _amountOfToken
    ) external returns (bool) {
        require(_delegate != address(0), "Delegate address cannot be zero");

        allow[msg.sender][_delegate] = _amountOfToken;
        emit Approval(msg.sender, _delegate, _amountOfToken);
        return true;
    }

    function allowance(
        address _owner,
        address _delegate
    ) external view returns (uint256) {
        return allow[_owner][_delegate];
    }

    function transferFrom(
        address _owner,
        address _receiver,
        uint256 _amountOfToken
    ) external returns (bool) {
        require(_owner != address(0), "Sender address cannot be zero");
        require(_receiver != address(0), "Receiver address cannot be zero");
        require(
            _amountOfToken <= balances[_owner],
            "Insufficient balance of owner"
        );
        require(
            _amountOfToken <= allow[_owner][msg.sender],
            "Allowance exceeded"
        );

        balances[_owner] -= _amountOfToken;
        allow[_owner][msg.sender] -= _amountOfToken;
        balances[_receiver] += _amountOfToken;

        emit Transfer(_owner, _receiver, _amountOfToken);
        return true;
    }

    function increaseAllowance(
        address _delegate,
        uint256 _addedValue
    ) external returns (bool) {
        require(_delegate != address(0), "Delegate address cannot be zero");
        allow[msg.sender][_delegate] += _addedValue;
        emit Approval(msg.sender, _delegate, allow[msg.sender][_delegate]);
        return true;
    }

    function decreaseAllowance(
        address _delegate,
        uint256 _subtractedValue
    ) external returns (bool) {
        require(_delegate != address(0), "Delegate address cannot be zero");
        require(
            allow[msg.sender][_delegate] >= _subtractedValue,
            "Allowance below zero"
        );
        allow[msg.sender][_delegate] -= _subtractedValue;
        emit Approval(msg.sender, _delegate, allow[msg.sender][_delegate]);
        return true;
    }

    function burn(address _address, uint256 _amount) internal {
        require(_address != address(0), "Invalid address");
        require(_amount <= balances[_address], "Insufficient balance to burn");

        balances[_address] -= _amount;
        totalSupply -= _amount;

        emit Transfer(_address, address(0), _amount);
    }

    function mint(uint256 _amount, address _addr) internal {
        require(_addr != address(0), "Invalid address");

        balances[_addr] += _amount;
        totalSupply += _amount;

        emit Transfer(address(0), _addr, _amount);
    }
}
