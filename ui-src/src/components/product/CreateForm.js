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

        <label htmlFor="name" className="f6 b db mb2">
          Name
        </label>
        <input
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          defaultValue={product && product.name ? product.name : ''}
          id="name"
        />

        <label htmlFor="description" className="f6 b db mb2">
          Description
        </label>
        <input
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          defaultValue={
            product && product.description ? product.description : ''
          }
          id="description"
        />

        <label htmlFor="image_url" className="f6 b db mb2">
          Image URL
        </label>
        <input
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          defaultValue={product && product.image_url ? product.image_url : ''}
          id="image_url"
        />

        <label htmlFor="price" className="f6 b db mb2">
          Price
        </label>
        <input
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          defaultValue={product && product.price ? product.price : ''}
          id="price"
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
