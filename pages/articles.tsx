import Head from "next/head"
import { GetStaticPropsResult } from "next"


import { articleTeaser, drupal } from "lib/drupal"
import { DrupalNode } from "next-drupal"

import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"

interface IndexPageProps {
  nodes: any[];
}

export default function ArticlesPage({ nodes }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>Articles | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Articles</h1>

        <div>
          <div className="articles" id="">
          {nodes?.length ? (

            nodes.map((node) => (
              <div key={node.id}>
                <NodeArticleTeaser node={node} />
              </div>
            ))

            ) 
            : 
            (
              <p className="py-4">No articles found</p>
            )
          }

          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // articleTeasers
  const nodes = await articleTeaser(context, 50);

  return {
    props: {
      nodes,
    },
  }
}