import React, { useGlobal } from 'reactn'
import { RouterLink, Table } from '../../styles/styledHtml'

const ProductListItem = props => {
  return (
    <Table.tr>
      <Table.td>
        <RouterLink.std to={`/product?address=${props.product.id}`}>
          <img
            src={props.product.image_url}
            className="br4 h3 w3 dib"
            style={{ objectFit: 'cover' }}
            alt="product thumb"
          />
        </RouterLink.std>
      </Table.td>
      <Table.td>
        <RouterLink.std to={`/product?address=${props.product.id}`}>
          {props.product.name}
        </RouterLink.std>
      </Table.td>
      <Table.td>{props.product.description}</Table.td>
      <Table.td>{props.product.price}</Table.td>
    </Table.tr>
  )
}

export const ProductList = () => {
  const [products] = useGlobal('products')
  return (
    <Table.table>
      <tbody>
        <Table.tr>
          <Table.th className="tl">Product</Table.th>
          <Table.th className="tl" />
          <Table.th className="tl">Description</Table.th>
          <Table.th className="tl">Price</Table.th>
        </Table.tr>

        {products.map(product => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </tbody>
    </Table.table>
  )
}
