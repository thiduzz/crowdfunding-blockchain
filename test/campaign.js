const Campaign = artifacts.require("Campaign");
const CampaignFactory = artifacts.require("CampaignFactory");

contract("Campaign", function ([deployer, manager, user]) {
  let campaignContract;

  before(async () => {
    const factoryContract = await CampaignFactory.deployed({from: deployer});
    await factoryContract.createCampaign(1000,{from: manager});
    const campaigns = await factoryContract.getCampaigns();
    campaignContract = await Campaign.at(campaigns[campaigns.length - 1])
  })


  it("manager be able to create plans", async function () {
    const id = 1212;
    const idPro = 1313;
    await campaignContract.createPlan(id, 2000,'basic plan', false, {from: manager})
    await campaignContract.createPlan(idPro, 4000,'pro plan', true, {from: manager})
    const planIds = await campaignContract.getPlanIds()
    expect(planIds).length(2)
    expect(planIds[0].toNumber()).to.equal(id)
    expect(planIds[1].toNumber()).to.equal(idPro)
  });

  it("not manager should not be able to create plans", async function () {
    const id = 666
    let errorPermission = null;
    try{
    await campaignContract.createPlan(id, 2000,'basic plan', false, {from: user})
    }catch (err){
      errorPermission = err;
    } finally {
      expect(errorPermission.message).to.include("This function is restricted to the contract's owner");
    }
    const value = await campaignContract.plans(id)
    expect(value.id.toNumber()).to.equal(0)
  });
});
