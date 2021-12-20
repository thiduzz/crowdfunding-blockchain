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

        bool found = false;
        for (uint i = 0; i < requests.length; i++) {
            SpendRequest memory request = requests[i];
            if(request.id == requestId){
                found = true;
                request.approvals = request.approvals + 1;
                requests[i].approved = request.approvals >= request.necessaryApprovals;
            }
        }
            require(
                !found,
                "Identifier of Request does not exists"
            );
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

        uint _necessaryApprovals = getFundersCount();

        requests.push(SpendRequest({id: _id, name: _name, amount: _amount, destination: _destination, necessaryApprovals: _necessaryApprovals, approvals: 0, approved: false }));
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

}