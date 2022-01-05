import { GetStaticProps } from 'next'
import Link from 'next/link'

import Layout from '@/components/UI/Layout'
import { Campaign } from '../../interfaces'
import { sampleCampaignData } from '../../utils/sample-data'
import List from '../../components/List'

type Props = {
  items: Campaign[]
}

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Campaign List | Next.js + TypeScript Example">
    <h1>Campaign List</h1>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  const items: Campaign[] = sampleCampaignData
  return { props: { items } }
}

export default WithStaticProps
