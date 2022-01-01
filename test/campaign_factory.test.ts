const campaignFactory = artifacts.require('CampaignFactory')

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('CampaignFactory', (/** accounts * */) => {
  it('should assert true', async () => {
    await campaignFactory.deployed()
    return expect(true).to.be.true
  })
})
