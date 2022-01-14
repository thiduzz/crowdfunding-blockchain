import Layout from '@/components/UI/Layout'
import { getContract } from '../lib/web3'
import { CampaignFactory } from '../types/web3/CampaignFactory'

const IndexPage = ({ campaigns }) => (
  <Layout title="Home">
    <div className="flex items-center justify-center flex-col">
      <h1>Home page</h1>
      {campaigns.map((campaign, i) => (
        <p key={i}>{campaign}</p>
      ))}
    </div>
  </Layout>
)

export async function getServerSideProps() {
  const contract = (await getContract('Factory')) as CampaignFactory
  const campaigns = await contract.methods.getCampaigns().call()
  return { props: { campaigns } }
}

export default IndexPage
