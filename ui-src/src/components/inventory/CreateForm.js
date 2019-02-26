import React, { useGlobal } from 'reactn'

import { Button, Input, Label, Select } from '../../styles/styledHtml'

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
        <Label.std htmlFor="product_address">Product</Label.std>
        <Select.std id="product_address">
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select.std>

        <Label.std htmlFor="stocked_units" className="f6 b db mb2">
          Quantity
        </Label.std>
        <Input.std
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          defaultValue={
            inventory && inventory.stocked_units ? inventory.stocked_units : ''
          }
          id="stocked_units"
        />

        <Button.std type="submit">Save</Button.std>
      </div>
    </form>
  )
}
