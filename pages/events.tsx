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

export default function EventsPage({ nodes, header }: IndexPageProps) {
  return (
    <Layout node={header}>
      <Head>
        <title>Events | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="core">
        <h1>Find Events</h1>
      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // node--event
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--event",
    context,
    { 
      params: {
        "filter[status]": 1,
        "fields[node--event]": "title,path,field_image,uid,created,field_hero_image_source,body",
        include: "node_type,uid",
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