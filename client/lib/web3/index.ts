import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import campaignFactoryDefinition from '../../../build/contracts/CampaignFactory.json'
import campaignDefinition from '../../../build/contracts/Campaign.json'
import { CampaignFactory } from '../../types/web3/CampaignFactory'
import { Campaign } from '../../types/web3/Campaign'

const resolveWeb3 = (resolve) => {
  let web3
  const alreadyInjected =
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' // i.e. Mist/Metamask
  if (alreadyInjected) {
    web3 = new Web3(window.ethereum)
    window.ethereum.enable()
  } else {
    const localProvider = process.env.NEXT_PUBLIC_PROVIDER_ENDPOINT
    const provider = new Web3.providers.HttpProvider(localProvider)
    web3 = new Web3(provider)
  }
  resolve(web3)
}

const loadWeb3 = (): Promise<Web3> =>
  new Promise((resolve) => {
    if (typeof window !== 'undefined') {
      window.addEventListener(`load`, () => {
        resolveWeb3(resolve)
      })
      if (document.readyState === `complete`) {
        resolveWeb3(resolve)
      }
    } else {
      resolveWeb3(resolve)
    }
  })

export const getContract = async (
  type: string,
  address?: string,
): Promise<CampaignFactory | Campaign> => {
  const loadedWeb3 = await loadWeb3()
  switch (type) {
    case 'Factory':
      return getCampaignFactoryContract(loadedWeb3, address)
    case 'Campaign':
      return getCampaignContract(loadedWeb3, address)
    default:
      return null
  }
}

export const getCampaignFactoryContract = async (
  web3: Web3,
  address?: string,
) => {
  const networkId = await web3.eth.net.getId()
  const { abi } = campaignFactoryDefinition
  const contract = new web3.eth.Contract(
    abi as AbiItem[],
    address ?? campaignFactoryDefinition.networks[networkId].address,
  )
  return contract as unknown as CampaignFactory
}

export const getCampaignContract = async (web3: Web3, address?: string) => {
  const networkId = await web3.eth.net.getId()
  const { abi } = campaignDefinition
  const contract = new web3.eth.Contract(
    abi as AbiItem[],
    address ?? campaignDefinition.networks[networkId].address,
  )
  return contract as unknown as Campaign
}

export default loadWeb3()
