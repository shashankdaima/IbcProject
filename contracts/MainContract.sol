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
    uint position;
    string roomHash;
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
  /*
  UTIL FUNCTIONS 
  
  */
  /// @dev Does a byte-by-byte lexicographical comparison of two strings.
    /// @return a negative number if `_a` is smaller, zero if they are equal
    /// and a positive numbe if `_b` is smaller.
    function compare(string memory _a, string memory _b) private returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    /// @dev Compares two strings and returns true iff they are equal.
    function equal(string memory _a, string memory _b) private returns (bool) {
        return compare(_a, _b) == 0;
    }
    /// @dev Finds the index of the first occurrence of _needle in _haystack
    function indexOf(string memory _haystack, string memory _needle) private returns (int)
    {
    	bytes memory h = bytes(_haystack);
    	bytes memory n = bytes(_needle);
    	if(h.length < 1 || n.length < 1 || (n.length > h.length)) 
    		return -1;
    	else if(h.length > (2**128 -1)) // since we have to be able to return -1 (if the char isn't found or input error), this function must return an "int" type with a max length of (2^128 - 1)
    		return -1;									
    	else
    	{
    		uint subindex = 0;
    		for (uint i = 0; i < h.length; i ++)
    		{
    			if (h[i] == n[0]) // found the first char of b
    			{
    				subindex = 1;
    				while(subindex < n.length && (i + subindex) < h.length && h[i + subindex] == n[subindex]) // search until the chars don't match or until we reach the end of a or b
    				{
    					subindex++;
    				}	
    				if(subindex == n.length)
    					return int(i);
    			}
    		}
    		return -1;
    	}	
    }
// UTIL END
  function uploadAnswerSheet( string memory _answer_sheet, string memory _email)public {
    require(bytes(_answer_sheet).length>0);
    require(bytes(_email).length>0);
    // require(examRoomId>0);
    require(msg.sender!= address(0x0));
    answerSheetPointer++;
    answerSheets[answerSheetPointer]=AnswerSheet(answerSheetPointer, 1, _answer_sheet,_email, msg.sender, 100);
  } 

  

  function createExamRoom(string memory roomHash,string memory ta_list,uint ta_count,string memory _questionPaperHash)public {
    require(bytes(_questionPaperHash).length>0);
    require(msg.sender!= address(0x0));
    examRoomPointer++;
    examRooms[examRoomPointer]=ExamRoom(examRoomPointer, roomHash,_questionPaperHash, ta_list, ta_count, msg.sender,now );
    emit ExamRoomCreated(examRoomPointer,roomHash,_questionPaperHash,  ta_list, ta_count, msg.sender);
  } 

  event ExamRoomCreated(
    uint id,
    string roomHash,
    string questionPaperHash,
    string ta_list,
    uint ta_count,
    address owner
  );


}
// Libraries
