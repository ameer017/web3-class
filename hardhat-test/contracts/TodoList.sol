// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract TodoList {
    address public owner;

    enum Status {
        None,
        Created,
        Edited,
        Done
    }

    struct Todo {
        string title;
        string description;
        Status status;
    }

    Todo[] public todos;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not allowed");
        _;
    }

    modifier validAddress() {
        require(msg.sender != address(0), "Zero Address not allowed");
        _;
    }

    event TodoCreated(string title, Status status);
    event TodoUpdated(string title, Status status);

    function createTodo(string memory _title, string memory _desc)
        external
        onlyOwner
        validAddress
        returns (bool)
    {
        Todo memory mytodo;
        mytodo.title = _title;
        mytodo.description = _desc;
        mytodo.status = Status.Created;

        todos.push(mytodo);

        emit TodoCreated(_title, Status.Created);
        return true;
    }

    function updateTodo(
        uint8 _index,
        string memory _title,
        string memory _desc
    ) external onlyOwner validAddress returns (bool) {
        require(_index < todos.length, "Out of bound");

        Todo storage mytodo = todos[_index];
        mytodo.title = _title;
        mytodo.description = _desc;
        mytodo.status = Status.Edited;

        emit TodoCreated(_title, Status.Edited);

        return true;
    }

    function getTodo(uint16 _index)
        external
        view
        validAddress
        returns (
            string memory,
            string memory,
            Status
        )
    {
        require(_index < todos.length, "Out of bound");
        Todo storage mytodo = todos[_index];
        return (mytodo.title, mytodo.description, mytodo.status);
    }

    function getAllTodo() public view validAddress returns (Todo[] memory) {
        return todos;
    }

    function deleteTodo(uint16 _index) public {
        require(_index < todos.length, "Out of bound");
        todos[_index] = todos[todos.length - 1];
        todos.pop();
    }

    function todoComplete(uint16 _index)
        public
        onlyOwner
        validAddress
        returns (bool)
    {
        require(_index < todos.length, "Out of bound");

        Todo storage mytodo = todos[_index];

        mytodo.status = Status.Done;

        return true;
    }
}
