const CampaignFactoryMigration = artifacts.require('CampaignFactory')

module.exports = async function (deployer) {
  const factoryContract = await deployer.deploy(CampaignFactoryMigration)
}
