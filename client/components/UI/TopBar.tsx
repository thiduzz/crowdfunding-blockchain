import React, { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  children?: ReactNode
}

const TopBar = ({ children }: Props) => (
  <header className="top-bar">
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      |{' '}
      <Link href="/campaigns">
        <a>Campaigns</a>
      </Link>{' '}
      |{' '}
      <Link href="/about">
        <a>About</a>
      </Link>{' '}
      | <a href="/api/campaigns">Campaigns API</a>
    </nav>
  </header>
)

export default TopBar
