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
    >

      <div className='measure'>
        <h1 className='f3 lh-copy'>Create Product</h1>

        <label htmlFor='name' className='f6 b db mb2'>Name</label>
        <input className='input-reset ba b--black-20 pa2 mb2 db w-100' />

        <label htmlFor='name' className='f6 b db mb2'>Description</label>
        <input className='input-reset ba b--black-20 pa2 mb2 db w-100' />

        <label htmlFor='name' className='f6 b db mb2'>Image URL</label>
        <input className='input-reset ba b--black-20 pa2 mb2 db w-100' />

        <label htmlFor='name' className='f6 b db mb2'>Price</label>
        <input className='input-reset ba b--black-20 pa2 mb2 db w-100' />

        <button type='submit' className='button-reset f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green'>Save</button>
      </div>
    </form>
  )
}
