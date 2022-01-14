import Layout from '@/components/UI/Layout'
import Input from '@/components/UI/Input'
import { BiBulb, BiBullseye, BiSave, BiText } from 'react-icons/bi'
import TextArea from '@/components/UI/TextArea'
import Button from '@/components/UI/Button'
import { useState } from 'react'
import { getContract } from '../../lib/web3'
import useWeb3 from '../../hooks/useWeb3'
import { CampaignFactory } from '../../types/web3/CampaignFactory'

const CreateCampaignPage = () => {
  const { accounts } = useWeb3()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [value, setValue] = useState<string>('10000')

  const handlerCreateCampaign = async () => {
    const contract = (await getContract('Factory')) as CampaignFactory
    await contract.methods
      .createCampaign(
        name,
        description,
        'https://picsum.photos/seed/crypto/500/500',
        value,
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
              onChange={(_name) => setName(_name)}
              icon={<BiBulb />}
            />
            <TextArea
              name="campaignDescription"
              label="Description"
              placeholder="Campaign description..."
              value=""
              onChange={(_description) => setDescription(_description)}
              icon={<BiText />}
            />
            <Input
              name="campaignValue"
              label="Value Goal in Wei"
              value={value}
              type="number"
              placeholder="Min. value 10000 wei"
              onChange={(_valueGoal) => setValue(_valueGoal)}
              icon={<BiBullseye />}
            />
          </form>
          <Button onClick={handlerCreateCampaign}>
            <BiSave className="text-white mr-3" /> Create Campaign
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCampaignPage
