import Layout from '@/components/UI/Layout'
import Input from '@/components/UI/Input'
import { BiBulb, BiBullseye, BiText } from 'react-icons/bi'
import TextArea from '@/components/UI/TextArea'
import Button from '@/components/UI/Button'
import { getContract } from '../../lib/web3'
import useWeb3 from '../../hooks/useWeb3'
import { CampaignFactory } from '../../types/web3/CampaignFactory'

const CreateCampaignPage = () => {
  const { accounts } = useWeb3()

  const handlerCreateCampaign = async () => {
    const contract = (await getContract('Factory')) as CampaignFactory
    await contract.methods
      .createCampaign(
        'test campaign',
        'description',
        'https://picsum.photos/seed/crypto/500/500',
        20000000,
      )
      .send({ from: accounts[0], gas: 6721975, chainId: 1337 })
  }

  // const handlerCreatePlan = async () => {
  //   const contract = (await getContract(
  //     'Campaign',
  //     '0xbB8bd0B73CD3505447Bcc9bd99210B5beCb0A356',
  //   )) as Campaign
  //
  //   await contract.methods
  //     .createPlan(101010, 1000000, 'First plan', true)
  //     .send({ from: accounts[0], gas: 6721975 })
  // }

  return (
    <Layout title="Campaign Create | Crowdfunding">
      <div className="flex items-center justify-center flex-col">
        <div>
          <form>
            <Input
              name="campaignName"
              label="Name"
              placeholder="Campaign name..."
              value=""
              onChange={(val) => console.log(val)}
              icon={<BiBulb />}
            />
            <TextArea
              name="campaignDescription"
              label="Description"
              placeholder="Campaign description..."
              value=""
              onChange={(val) => console.log(val)}
              icon={<BiText />}
            />
            <Input
              name="campaignValue"
              label="Value Goal in Eth"
              value=""
              type="number"
              onChange={(val) => console.log(val)}
              icon={<BiBullseye />}
            />
          </form>
          <Button onClick={handlerCreateCampaign}>Create Campaign</Button>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCampaignPage
