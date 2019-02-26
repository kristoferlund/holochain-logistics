import { Button, Input, Label } from '../../styles/styledHtml'

import React from 'react'

export const ProductCreateForm = ({ submit, product }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        const address = e.target[0].value
        const name = e.target[1].value
        const description = e.target[2].value
        const image_url = e.target[3].value
        const price = e.target[4].value

        if (name.length === 0) {
          return
        }
        submit({
          address,
          name,
          description,
          image_url,
          price
        })
        e.target[0].value = ''
        e.target[1].value = ''
        e.target[2].value = ''
        e.target[3].value = ''
        e.target[4].value = ''
      }}
    >
      <div className="measure">
        <input
          type="hidden"
          id="address"
          value={product && product.address ? product.address : ''}
        />

        <Label.std htmlFor="name">Name</Label.std>
        <Input.std
          defaultValue={product && product.name ? product.name : ''}
          id="name"
        />

        <Label.std htmlFor="description">Description</Label.std>
        <Input.std
          defaultValue={
            product && product.description ? product.description : ''
          }
          id="description"
        />

        <Label.std htmlFor="image_url">Image URL</Label.std>
        <Input.std
          defaultValue={product && product.image_url ? product.image_url : ''}
          id="image_url"
        />

        <Label.std htmlFor="price">Price</Label.std>
        <Input.std
          defaultValue={product && product.price ? product.price : ''}
          id="price"
        />

        <Button.std type="submit">Save</Button.std>
      </div>
    </form>
  )
}
