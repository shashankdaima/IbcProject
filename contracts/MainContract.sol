// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract MainContract {
  uint public taskCount=0; // state variable
  mapping(uint=> ExamRoom) public examRooms;
  uint public examRoomPointer=0;
  mapping(uint=> AnswerSheet) public answerSheets;
  uint public answerSheetPointer=0;
  mapping(uint=> MainCheckerReview) public mainTaReviews;
  uint public mainTaReviewsPointer=0;
  mapping(uint=> CrossCheckerReview) public crossCheckerReview;
  uint public crossCheckerReviewPointer=0;
  


  struct AnswerSheet{
    uint id; //Answer sheet id
    uint examRoomId; //id of Exam Room 
    string answer_sheet; // answer sheet hash
    string email; //Email
    address pubkey; // Student ID 
    uint maxMarks;
  }

  struct MainCheckerReview{
    uint id;
    uint examRoomId;
    uint answerId;
    address pubkey;
    mapping(uint=> uint) marks;
    mapping (uint=> string) reviews;
    uint noOfQuestions;
  }
  
  struct CrossCheckerReview{
    uint id;
    uint mainCheckerId;
    uint examRoomId;
    uint answerId;
    address pubkey;
    mapping (uint=> bool) agrees;
    mapping (uint=> string) reviews;
    uint noOfQuestions;
  }

  struct ExamRoom{
    uint id;
    string questionPaperHash;
    string ta_list;
    uint ta_count;
    address owner;
    uint deadline;
  }

  struct Result{
    mapping(uint=> uint) marks;
    mapping (uint=> string) reviews;
  }

  constructor()public{
    taskCount=2;
  }

  function uploadAnswerSheet( string memory _answer_sheet, string memory _email)public {
    require(bytes(_answer_sheet).length>0);
    require(bytes(_email).length>0);
    // require(examRoomId>0);
    require(msg.sender!= address(0x0));
    answerSheetPointer++;
    answerSheets[answerSheetPointer]=AnswerSheet(answerSheetPointer, 1, _answer_sheet,_email, msg.sender, 100);
  } 

  
  function getExamRoom(uint id)public returns (string memory){
    return examRooms[id].ta_list;
  }

  function createExamRoom(string memory ta_list,uint ta_count,string memory _questionPaperHash)public {
    require(bytes(_questionPaperHash).length>0);
    require(msg.sender!= address(0x0));
    examRoomPointer++;
    examRooms[examRoomPointer]=ExamRoom(examRoomPointer,_questionPaperHash, ta_list, ta_count, msg.sender,2023 );
    emit ExamRoomCreated(examRoomPointer,_questionPaperHash,  ta_list, ta_count, msg.sender);
  } 

  event ExamRoomCreated(
    uint id,
    string questionPaperHash,
    string ta_list,
    uint ta_count,
    address owner
  );


}