const CampaignFactoryMigration = artifacts.require("CampaignFactory");

module.exports = function (deployer) {
  deployer.deploy(CampaignFactoryMigration);
};
