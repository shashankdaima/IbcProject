// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Auth {
  uint storedData;
  string [] public accounts ;

  function getCurrentUser( )  public returns(address){
      return msg.sender;
  }

  function addAccount  (string memory accountAddress)public {
    accounts.push(accountAddress);
  }
}
