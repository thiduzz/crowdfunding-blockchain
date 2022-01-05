import React from 'react'
import Link from 'next/link'

import { Campaign } from '../interfaces'

type Props = {
  data: Campaign
}

const ListItem = ({ data }: Props) => (
  <Link href="/campaigns/[id]" as={`/campaigns/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
)

export default ListItem
