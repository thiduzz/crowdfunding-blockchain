const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compile = require('../.build/compile')
const provider = new HDWalletProvider(
  //the 12 word phrase
  process.env.DEPLOYMENT_MNEUMONIC_PHRASE,
  //the infure rinkeby test network endpoint
  process.env.DEPLOYMENT_PROVIDER_ADDRESS,
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  const { Campaign } = await compile('Campaign.sol')
  const campaign = await new web3.eth.Contract(Campaign.abi)
    .deploy({ data: campaign.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })
  console.log('Contract deployed to ' + campaign.options.address)
  provider.engine.stop()
}

deploy()
