// SPDX-License-Identifier: MIT
pragma solidity^0.8.13;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign (uint minimumContribution) public {
        Campaign newcp = new Campaign(minimumContribution,msg.sender);
        deployedCampaigns.push(address(newcp));
    }

    function getAllCampaigns() public view returns (address [] memory){
        return deployedCampaigns;
    }
}


contract Campaign {
    address public manager;
    mapping(address => bool) approvers;
    uint public minimumContribution;
    uint256 public numRequests;
    mapping (uint256 => Request) public requests;
    uint public approversCount;
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping (address=>bool) votedAddresses;
    }
    
    modifier OnlyOwner(){
        require(msg.sender == manager);
        _;
    }
    constructor (uint minimumAmount, address campaignCreator) {
        manager = campaignCreator;
        minimumContribution = minimumAmount;
    }
 
    function contribute() public payable {
        require(msg.value>minimumContribution);
        require(!approvers[msg.sender]);
        approvers[msg.sender]=true;
        approversCount++;
    }

    function createRequest(string calldata fdescription,uint fvalue, address frecipient ) 
        public OnlyOwner{
            // tmpRequest =  Request({description: fdescription, value: fvalue, recipient:frecipient, complete: false});
            // requests.push(tmpRequest);
            Request storage r = requests[numRequests++];
            r.description = fdescription;
            r.value = fvalue;
            r.recipient = frecipient;
            r.complete = false;
            r.approvalCount = 0;

    }

    function approveRequest (uint index) public {

        Request storage currentRequest = requests[index];
        require(approvers[msg.sender]);
        require(!currentRequest.votedAddresses[msg.sender]);
        currentRequest.approvalCount++;
        currentRequest.votedAddresses[msg.sender] = true;
    }

    function finalizeRequest (uint index) public OnlyOwner{
        
        Request storage currentRequest = requests[index];
        require (currentRequest.approvalCount>approversCount/2);
        require(!currentRequest.complete);
        currentRequest.complete = true;
        payable(currentRequest.recipient).transfer(currentRequest.value);
        
        
    }

 
}