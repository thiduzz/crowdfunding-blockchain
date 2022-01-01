// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public campaignAddresses;

    function createCampaign(uint _valueGoal) public {
        Campaign newCampaign = new Campaign(_valueGoal, msg.sender);
        campaignAddresses.push(address(newCampaign));
    }

    function getCampaigns() public view returns(address[] memory){
        return campaignAddresses;
    }

    function getCampaignsLength() public view returns(uint){
        return campaignAddresses.length;
    }

}