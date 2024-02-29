import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"

interface IndexPageProps {
  nodes: any[];
  header: any;
}

export default function ArticlesPage({ nodes, header }: IndexPageProps) {
  return (
    <Layout node={header}>
      <Head>
        <title>Articles | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Articles</h1>

        {nodes?.length ? (
          <div className="" id="">
            <div className="upcomingevents" id="slider">
              {nodes.map((node) => (
                <div key={node.id}>
                  <NodeArticleTeaser node={node} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="py-4">No nodes found</p>
        )}

      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // node--event
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    { 
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_image,uid,created,body",
        include: "node_type,uid,field_image",
        sort: "-created",
      },
    }
  )

  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )
  console.log(header, 'header');

  

  return {
    props: {
      nodes,
      header,
    },
  }
}