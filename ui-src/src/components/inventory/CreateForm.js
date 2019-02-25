import React, { useGlobal } from 'reactn'

export const InventoryCreateForm = ({ submit, inv: inventory }) => {
  const [products] = useGlobal('products')
  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        const product_address = e.target[0].value
        const stocked_units = e.target[1].value

        if (product_address.length === 0) {
          return
        }

        submit({
          product_address,
          stocked_units
        })
        e.target[0].value = ''
        e.target[1].value = ''
      }}
    >
      <div className="measure">
        <label htmlFor="product_address" className="f6 b db mb2">
          Product
        </label>
        <select id="product_address">
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <label htmlFor="stocked_units" className="f6 b db mb2">
          Quantity
        </label>
        <input
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          defaultValue={
            inventory && inventory.stocked_units ? inventory.stocked_units : ''
          }
          id="stocked_units"
        />

        <button
          type="submit"
          className="button-reset f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green"
        >
          Save
        </button>
      </div>
    </form>
  )
}
