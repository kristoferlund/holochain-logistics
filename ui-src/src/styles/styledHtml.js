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
    <Link to={to} className={classNames(className, 'black-70 link dim')}>
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
