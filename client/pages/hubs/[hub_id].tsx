import Head from 'next/head'

type HubDetailsViewPropsT = {}

const HubDetailsView = ({ }: HubDetailsViewPropsT) => {

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hub Details View</h1>
        <p>Place holder</p>
      </main>
    </div>
  )
}

export default HubDetailsView
