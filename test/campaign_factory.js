const CampaignFactory = artifacts.require("CampaignFactory");
const Campaign = artifacts.require("Campaign");

contract("CampaignFactory", function ([deployer, manager]) {
  it("should assert deployed", async function () {
    await CampaignFactory.deployed();
    return assert.isTrue(true);
  });

  it("should assert can generate campaigns", async function () {
    const factoryContract = await CampaignFactory.deployed();
    await factoryContract.createCampaign(1000);
    await factoryContract.createCampaign(2000);
    const campaigns = await factoryContract.getCampaigns();
    return expect(campaigns).length(2)
  });

  it("should assert creating campaign account is campaign manager", async function () {
    const factoryContract = await CampaignFactory.deployed({from: deployer});
    await factoryContract.createCampaign(1000, {from: manager});
    const campaigns = await factoryContract.getCampaigns();
    const campaignContract = await Campaign.at(campaigns[campaigns.length - 1])
    const gotManager = await campaignContract.manager()
    expect(gotManager).to.be.equal(manager)
  });
});
