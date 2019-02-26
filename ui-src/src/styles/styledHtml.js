/* eslint-disable */

import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export const A = {
  std: ({ href, className, children }) => (
    <a href={href} className={classNames(className, 'pv2 ph3 tl f6 fw6 ttu')}>
      {children}
    </a>
  )
}

export const RouterLink = {
  std: ({ to, className, children }) => (
    <Link to={to} className={classNames(className, 'blue link dim')}>
      {children}
    </Link>
  )
}

export const H = {
  h1: ({ className, children }) => (
    <h1 className={classNames(className, 'f1 lh-copy')}>{children}</h1>
  ),
  h3: ({ className, children }) => (
    <h1 className={classNames(className, 'f3 lh-copy')}>{children}</h1>
  )
}

export const Table = {
  table: ({ className, children }) => (
    <table
      className={classNames(className, 'collapse ba br2 b--black-10 pv2 ph3')}
    >
      {children}
    </table>
  ),
  tr: ({ className, children }) => (
    <tr className={classNames(className, 'striped--light-gray')}>{children}</tr>
  ),
  th: ({ className, children }) => (
    <th className={classNames(className, 'pv2 ph3 f6 fw6 ttu')}>{children}</th>
  ),
  td: ({ className, children }) => (
    <td className={classNames(className, 'pv2 ph3 f5 f4-ns')}>{children}</td>
  )
}

export const Button = {
  std: ({ className, onClick, type, children }) => (
    <button
      className={classNames(
        className,
        'button-reset bg-black-70 ba dib pa2 ph4 br3 mt2 white dim pointer bw0 mb2 f5 f4-ns'
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  ),
  icon: ({ className, onClick, children }) => (
    <button
      className={classNames(
        className,
        'button-reset bg-black-70 ba dib ph2 pv1 br3 mt2 white dim pointer bw0 mb2'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const Input = {
  std: ({ className, defaultValue, id }) => (
    <input
      className={classNames(
        className,
        'input-reset ba b--black-20 pa2 mb2 db w-100 f5 f4-ns black-70'
      )}
      defaultValue={defaultValue}
      id={id}
    />
  )
}

export const Select = {
  std: ({ className, id, children }) => (
    <select
      className={classNames(
        className,
        'ba b--black-20 pa2 mb2 db f5 f4-ns black-70'
      )}
      id={id}
    >
      {children}
    </select>
  )
}

export const Label = {
  std: ({ className, htmlFor, children }) => (
    <label
      className={classNames(className, 'f6 f5-ns b db mb2')}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export const P = {
  std: ({ className, children }) => (
    <p className={classNames(className, 'f5 f4-ns lh-copy')}>{children}</p>
  )
}
