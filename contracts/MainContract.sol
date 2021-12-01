// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract MainContract {
  uint storedData=2;
  address currentUser;

  constructor() public {
    storedData=2;
    currentUser=msg.sender;
  }

  function get() public view returns (uint) {
    return storedData;
  }

}
