// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;




contract Campaign {

    struct Plan {
        uint id;
        uint amount;
        string name;
        address payable[] funders;
        uint fundersCount;
        bool votable;
    }

    struct SpendRequest {
        uint id;
        string name;
        uint amount;
        address payable destination;
        uint necessaryApprovals;
        uint approvals;
        bool approved;
        bool executed;
    }

    address public manager;
    uint public valueGoal;
    Plan[] public plans;
    SpendRequest[] public requests;


    constructor(uint _valueGoal) {
        manager = msg.sender;
        valueGoal = _valueGoal;
    }

    modifier restrictedToManager() {
        require(
            msg.sender == manager,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    modifier planDoesntExists(uint id) {
        bool found = false;
        for (uint i = 0; i < plans.length; i++) {
            if(plans[i].id == id){
                found = true;
            }
        }
            require(
                found,
                "Identifier of Plan already exists"
            );
        _;
    }

    modifier requestDoesntExists(uint id) {
        bool found = false;
        for (uint i = 0; i < requests.length; i++) {
            if(requests[i].id == id){
                found = true;
            }
        }
            require(
                found,
                "Request already exists"
            );
        _;
    }



    modifier validateContribution(uint planIndex) {
        Plan memory plan = plans[planIndex];
        require(
            msg.value == plan.amount,
            string(abi.encodePacked( "Plan ",plan.name, " requires ", plan.amount, " eth"))
        );
        _;
    }


    function approve(uint requestId) public payable  {
        (SpendRequest memory request, int index) = findRequestById(requestId);
        require(
            index > 0,
            "Request does not exists"
        );
        request.approvals = request.approvals + 1;
        request.approved = request.approvals >= request.necessaryApprovals;
        requests[uint(index)] = request;
        
    }

    function executeRequest(uint requestId) public payable  {
        (SpendRequest memory request, int index) = findRequestById(requestId);
        require(
            index > 0,
            "Request does not exists"
        );
        require(
            request.approved,
            "Request is not approved"
        );
        require(
            !request.executed,
            "Request has been already executed"
        );
        request.destination.transfer(request.amount);
        request.executed = true;
        requests[uint(index)] = request;
    }

    function contribute(uint planIndex) public payable validateContribution(planIndex) {
        plans[planIndex].funders.push(payable(msg.sender));
        plans[planIndex].fundersCount = plans[planIndex].funders.length;
    }

    function createPlan(uint _id, uint _amount, string memory _name, bool _votable) public restrictedToManager planDoesntExists(_id) {

        address payable[] memory _funders;

        plans.push(Plan({id: _id, amount: _amount, name: _name, votable: _votable, fundersCount: 0, funders: _funders }));
    }

    function createRequest(uint _id,string memory _name, uint _amount,  address payable _destination) public restrictedToManager {

        uint _necessaryApprovals = uint(getFundersCount() / 50) * 100; // will ceil by truncating decimals

        requests.push(SpendRequest({
            id: _id,
             name: _name,
              amount: _amount,
              destination: _destination,
               necessaryApprovals: _necessaryApprovals,
               approvals: 0,
               approved: _necessaryApprovals == 0,
                executed: false
        }));
    }


    function getValue() public view returns(uint) {
        return address(this).balance;
    }


    function getFundersCount() public view returns(uint){
        uint total = 0;
        for (uint i = 0; i < plans.length; i++) {
            if( plans[i].fundersCount != 0 ){
                total = total + plans[i].fundersCount;
            }
        }
        return total;
    }

    function findRequestById(uint id) view private returns (SpendRequest memory, int){

        for (uint i = 0; i < requests.length; i++) {
            SpendRequest memory request = requests[i];
            if(request.id == id){
                return (request, int(i));
            }
        }
        SpendRequest memory noReturnObj;
        return (noReturnObj, -1);
    }

}