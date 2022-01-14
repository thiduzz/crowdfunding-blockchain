import React, { ReactNode } from 'react'
import Link from 'next/link'
import Button from '@/components/UI/Button'

type Props = {
  children?: ReactNode
}

const TopBar = ({ children }: Props) => (
  <header className="top-bar">
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
    <menu>
      <div>
        <Link href="/campaigns/create" passHref>
          <Button appearance="menu">Create Campaign</Button>
        </Link>
      </div>
    </menu>
  </header>
)

export default TopBar
