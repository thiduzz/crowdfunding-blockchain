const CampaignFactory = artifacts.require('CampaignFactory')
const Campaign = artifacts.require('Campaign')
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

contract('CampaignFactory', function ([deployer, manager]) {
  it('should assert deployed', async function () {
    await CampaignFactory.deployed()
    return assert.isTrue(true)
  })

  it('should assert can generate campaigns', async function () {
    const factoryContract = await CampaignFactory.deployed()
    await factoryContract.createCampaign(
      'test campaign',
      'description',
      'http://somewhere.com',
      10000,
    )
    await factoryContract.createCampaign(
      'test campaign2',
      'description2',
      'http://somewhere.com',
      20000,
    )
    const campaigns = await factoryContract.getCampaigns()
    return expect(campaigns).length(2)
  })

  it('should assert creating campaign account is campaign manager', async function () {
    const factoryContract = await CampaignFactory.deployed({ from: deployer })
    await factoryContract.createCampaign(
      'test campaign2',
      'description2',
      'http://somewhere.com',
      20000,
      { from: manager },
    )
    const campaigns = await factoryContract.getCampaigns()
    const campaignContract = await Campaign.at(campaigns[campaigns.length - 1])
    const gotManager = await campaignContract.manager()
    expect(gotManager).to.be.equal(manager)
  })

  it('should assert can only generate campaigns that are worth more than 10000 wei', async function () {
    const factoryContract = await CampaignFactory.deployed()
    await expect(
      factoryContract.createCampaign(
        'test campaign',
        'description',
        'http://somewhere.com',
        1,
      ),
    ).to.be.rejectedWith(Error)
  })
})
