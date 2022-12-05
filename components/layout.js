import Head from 'next/head'
import Navbar from './navbar'

export default function Layout ({ children }){
    return (
        <>
        <Head>
          <title>Estock</title>
          <meta name="description" content="Estock Marketplace" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main>{children}</main>
        </>
    )
}