import React, { useGlobal } from 'reactn'

export const ProductHistory = () => {
  const [product] = useGlobal('product')

  if (product.history.items) {
    return product.history.items.map(item => (
      <pre key={item.meta.address} className="pa3 bg-light-gray f7 pre">
        {JSON.stringify(item, null, 2)}
      </pre>
    ))
  }
  return null
}
