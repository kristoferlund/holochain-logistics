import React, { useGlobal } from 'reactn'
import { RouterLink, Table } from '../../styles/styledHtml'

import { getProductImageUrl, getProductName } from '../../state/product'

const InventoryListItem = props => {
  const { item } = props
  return (
    <Table.tr key={item.id}>
      <Table.td>
        <RouterLink.std to={`/product?address=${item.product_address}`}>
          <img
            src={getProductImageUrl(item.product_address)}
            className="br4 h3 w3 dib"
            style={{ objectFit: 'cover' }}
            alt="product thumb"
          />
        </RouterLink.std>
      </Table.td>

      <Table.td>
        <RouterLink.std to={`/product?address=${item.product_address}`}>
          {getProductName(item.product_address)}
        </RouterLink.std>
      </Table.td>

      <Table.td className="tc">{item.stocked_units}</Table.td>
    </Table.tr>
  )
}

export const InventoryList = () => {
  const [inventory] = useGlobal('inventory')
  return (
    <Table.table>
      <tbody>
        <Table.tr>
          <Table.th className="tl" />
          <Table.th className="tl">Product</Table.th>
          <Table.th className="tc">Stocked units</Table.th>
        </Table.tr>
        {inventory.map(item => (
          <InventoryListItem key={item.id} item={item} />
        ))}
      </tbody>
    </Table.table>
  )
}
