import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { useEffect, useState } from "react"

import { drupal } from "lib/drupal"
import { DrupalNode } from "next-drupal"

import { Layout } from "components/layout"

interface IndexPageProps {
  nodes: DrupalNode[];
}

export default function FavouritesPage({ nodes }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>Shopping Cart | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Favourites</h1>

      {/* embed a site: https://www.apple.com/ */}
      {/* <iframe src="https://be.indeed.com/personeel" width="100%" height="500px"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"></iframe> */}
      </div>
    </Layout>
  );
};

// export async function getStaticProps(
//   context
// ): Promise<GetStaticPropsResult<IndexPageProps>> {
//   // node--event
  
// }