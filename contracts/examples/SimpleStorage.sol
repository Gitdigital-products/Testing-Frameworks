// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    uint256 private storedValue;
    address public owner;
    
    event ValueChanged(address indexed user, uint256 newValue);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function set(uint256 _value) public onlyOwner {
        storedValue = _value;
        emit ValueChanged(msg.sender, _value);
    }
    
    function get() public view returns (uint256) {
        return storedValue;
    }
}
