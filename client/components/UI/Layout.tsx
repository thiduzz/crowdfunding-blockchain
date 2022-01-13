import React, { ReactNode } from 'react'
import Head from 'next/head'
import TopBar from '@/components/UI/TopBar'
import Footer from '@/components/UI/Footer'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="layout-wrapper">
      <TopBar />
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  </div>
)

export default Layout