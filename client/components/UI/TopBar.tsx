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
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
    <menu>
      <div>
        <Link href="/campaigns/create" passHref>
          <button type="button">Create Campaign</button>
        </Link>
      </div>
    </menu>
  </header>
)

export default TopBar
