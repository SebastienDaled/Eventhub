import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"

interface IndexPageProps {
  nodes: DrupalNode[]
  header: any
}


export default function IndexPage({ nodes, header }: IndexPageProps) {
  // console.log(header, 'header index');
  
  return (
    <Layout node={header}>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      {/* <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div> */}

      <div>
        <h2 className="subtitle">Upcoming Events</h2>
        
        <div className="upcomingevents">
          {nodes?.length ? (
            nodes.map((node) => (
              <div key={node.id}>
                <NodeEventTeaser node={node} />
              </div>
            ))
          ) : (
            <p className="py-4">No nodes found</p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
  //   "node--article",
  //   context,
  //   {
  //     params: {
  //       "filter[status]": 1,
  //       "fields[node--article]": "title,path,field_image,uid,created",
  //       include: "field_image,uid",
  //       sort: "-created",
  //     },
  //   }
  // )

  // node--event
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--event",
    context,
    { 
      params: {
        "filter[status]": 1,
        "fields[node--event]": "title,path,field_image,uid,created,field_hero_image_source,body,field_city,field_date",
        include: "node_type,uid",
        sort: "-created",
      },
    }
  )

  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )
  // console.log(header, 'header');

  

  return {
    props: {
      nodes,
      header,
    },
  }
}