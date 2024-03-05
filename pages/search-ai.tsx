import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode, DrupalSearchApiFacet, getSearchIndexFromContext } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"
import { use, useEffect, useState } from "react"
import { deserialize } from "v8"

interface IndexPageProps {
  header: any;
  menu: any;
}

export default function SearchAiPage({ header, menu }: IndexPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Layout node={header} menu={menu}>
      <Head>
        <title>Search AI | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div className="corePage">
        <div className="searchAi">
          <h1>Search AI</h1>

          <div className="searchFields">
            <input className="searchInput" type="text" placeholder="search for events or articles..." onChange={
              (e) => setSearchTerm(e.target.value)
            }/>
            <input type="button" value="Search" onClick={() => {

            }
            } className="searchSelect"/>
          </div>
          <p className="noResults">Coming soon</p>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )

  const menu = await drupal.getMenu("main");

  return {
    props: {
      header,
      menu,
    },
  }
}