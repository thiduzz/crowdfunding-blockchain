// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Campaign {

    struct Plan {
        uint id;
        uint amount;
        string name;
        mapping(address => bool) funders;
        uint fundersCount;
        bool votable;
    }

    struct SpendRequest {
        uint id;
        string name;
        uint amount;
        uint necessaryApprovals;
        address payable destination;
        mapping(address => bool) approvers;
        uint approversCount;
        bool approved;
        bool executed;
    }

    struct Meta {
        string name;
        string description;
        string imageUrl;
        uint valueGoal;
        bool closed;
    }

    Meta public metadata;
    address public manager;
    uint contributionsCount;
    uint[] public planIds;
    mapping(uint => Plan) public plans;
    uint[] public requestIds;
    mapping(uint => SpendRequest) public requests;

    constructor(Meta memory _metadata, address _manager) {
        manager = _manager;
        metadata = _metadata;
    }

    modifier restrictedToManager() {
        require(
            msg.sender == manager,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    modifier planDoesntExists(uint id) {
        Plan storage plan = plans[id];
        require(
            plan.id == 0,
            "Identifier of Plan already exists"
        );
        _;
    }

    modifier campaignNotClosed() {

        require(
            metadata.closed == false,
            "Campaign is already closed"
        );
        _;
    }

    modifier requestDoesntExists(uint id) {

        SpendRequest storage request = requests[id];
        require(
            request.id == 0,
            "Request already exists"
        );
        _;
    }

    modifier validateContribution(uint planId) {
        Plan storage plan = plans[planId];
        require(
            plan.id > 0 && plan.id == planId,
            string(abi.encodePacked( "Plan is not found"))
        );
        require(
            msg.value == plan.amount,
            string(abi.encodePacked( "Plan ",plan.name, " requires ", plan.amount, " eth"))
        );
        require(
            !plan.funders[msg.sender],
            "Plan was already subscribed by address"
        );
        _;
    }


    function approve(uint requestId) public payable  {
        (SpendRequest storage request, bool found) = findRequestById(requestId);
        require(
            found,
            "Request does not exists"
        );
        require(
            !request.executed,
            "Request has been already executed"
        );
        require(
            !request.approved,
            "Request is already approved"
        );
        require(
            !request.approvers[msg.sender],
            "Request was already approved by address"
        );
        request.approvers[msg.sender] = true;
        request.approversCount++;
        request.approved = request.approversCount >= request.necessaryApprovals;

    }

    function executeRequest(uint requestId) public payable campaignNotClosed {
        (SpendRequest storage request, bool found) = findRequestById(requestId);
        require(
            found,
            "Request does not exists"
        );
        require(
            !request.executed,
            "Request has been already executed"
        );
        require(
            request.approved,
            "Request is not approved"
        );
        request.destination.transfer(request.amount);
        request.executed = true;
    }

    function contribute(uint planIndex) public payable campaignNotClosed validateContribution(planIndex) {
        plans[planIndex].funders[msg.sender] = true;
        plans[planIndex].fundersCount++;
        contributionsCount++;
    }

    function createPlan(uint _id, uint _amount, string memory _name, bool _votable) public campaignNotClosed restrictedToManager planDoesntExists(_id) {
        require(_id > 0,
            "Identifier has to be greater than zero");
        Plan storage newPlan = plans[_id];
        newPlan.id = _id;
        newPlan.amount = _amount;
        newPlan.name = _name;
        newPlan.votable = _votable;
        newPlan.fundersCount = 0;
        planIds.push(_id);
    }

    function close() public campaignNotClosed restrictedToManager returns(bytes memory) {
        require(metadata.valueGoal > address(this).balance,
            "Campaign can't be closed without reaching its value");
        metadata.closed = true;
        (bool sent, bytes memory data) =  manager.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        return data;
    }

    function createRequest(uint _id,string memory _name, uint _amount,  address payable _destination) public campaignNotClosed restrictedToManager requestDoesntExists(_id) {
        require(_id > 0,
            "Identifier has to be greater than zero");
        uint _necessaryApprovals = uint(contributionsCount / 50) * 100; // will ceil by truncating decimals
        SpendRequest storage newRequest = requests[_id];
        newRequest.id = _id;
        newRequest.amount = _amount;
        newRequest.name = _name;
        newRequest.destination = _destination;
        newRequest.necessaryApprovals = _necessaryApprovals;
        newRequest.approved = _necessaryApprovals == 0;
        newRequest.executed = false;
        requestIds.push(_id);
    }


    function getValue() public view returns(uint) {
        return address(this).balance;
    }


    function getPlanIds() public view returns (uint[] memory) {
        return planIds;
    }


    function getRequestIds() public view returns (uint[] memory) {
        return requestIds;
    }

    function findRequestById(uint id) view private returns (SpendRequest storage, bool){
        SpendRequest storage request = requests[id];
        if(request.id == id){
            return (request, true);
        }
        return (request, false);
    }

}