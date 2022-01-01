const CampaignFactory = artifacts.require('CampaignFactory')

module.exports = function (deployer: Truffle.Deployer) {
  deployer.deploy(CampaignFactory)
} as Truffle.Migration
