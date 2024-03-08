import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { useState } from "react"

import { Layout } from "components/layout"

interface IndexPageProps {

}

export default function SearchAiPage({  }: IndexPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Layout>
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

  return {
    props: {

    },
  }
}