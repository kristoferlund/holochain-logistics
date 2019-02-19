import React from 'react'

export const CreateProductForm = ({ submit }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        const name = e.target[0].value
        const description = e.target[1].value
        const image_url = e.target[2].value
        const price = e.target[3].value

        if (name.length === 0) {
          return
        }

        submit({
          name,
          description,
          image_url,
          price
        })
        e.target[0].value = ''
        e.target[1].value = ''
        e.target[2].value = ''
        e.target[3].value = ''
      }}
    > <label>Create A New Product </label>

      <input placeholder='Name...' />
      <input placeholder='Description...' />
      <input placeholder='Image URL...' />
      <input placeholder='Price...' />
      <button type='submit'>Save</button>
    </form>
  )
}
