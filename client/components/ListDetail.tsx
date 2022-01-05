import * as React from 'react'

import { Campaign } from '../interfaces'

type ListDetailProps = {
  item: Campaign
}

const ListDetail = ({ item: campaign }: ListDetailProps) => (
  <div>
    <h1>Detail for {campaign.name}</h1>
    <p>ID: {campaign.id}</p>
    <img src={campaign.image} />
  </div>
)

export default ListDetail
