// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract MainContract {
  uint public taskCount=0; // state variable
  mapping(uint=> ExamRoom) public examRooms;
  uint public examRoomPointer=0;


  struct ExamRoom{
    uint id;
    string questionPaperHash;
    string [] ta_list;
    uint ta_count;
    address owner;
  }

  constructor()public{
    taskCount=2;
  }


  function createExamRoom(string [] memory _ta_list, uint  _ta_count,string memory _questionPaperHash)public {
    require(bytes(_questionPaperHash).length>0);
    require(_ta_count>0);
    require(msg.sender!= address(0x0));
    examRoomPointer++;
    examRooms[examRoomPointer]=ExamRoom(examRoomPointer,_questionPaperHash, _ta_list, _ta_count, msg.sender);
    emit ExamRoomCreated(examRoomPointer,_questionPaperHash, _ta_list, _ta_count, msg.sender);
  } 

  event ExamRoomCreated(
    uint id,
    string questionPaperHash,
    string [] ta_list,
    uint ta_count,
    address owner
  );
}
