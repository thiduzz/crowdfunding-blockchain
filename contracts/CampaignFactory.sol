// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public campaignAddresses;
    event NewContract(address indexed _from, address indexed _campaign, uint _valueGoal);


    modifier validateCampaignValue(uint _value) {
        require(
            _value >= 10000,
            "Campaigns must be worth at least 10000 wei"
        );
        _;
    }

    function createCampaign(string memory _name, string memory _description, string memory _imageUrl, uint _valueGoal) public validateCampaignValue(_valueGoal) {
        Campaign.Meta memory meta = Campaign.Meta(
            {
                name: _name,
                description: _description,
                imageUrl: _imageUrl,
                valueGoal: _valueGoal,
                closed: false
            }
        );
        Campaign newCampaign = new Campaign(meta, msg.sender);
        campaignAddresses.push(address(newCampaign));
        emit NewContract(msg.sender, address(newCampaign), _valueGoal);
    }

    function getCampaigns() public view returns(address[] memory){
        return campaignAddresses;
    }

    function getCampaignsLength() public view returns(uint){
        return campaignAddresses.length;
    }

}