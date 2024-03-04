import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"
import { Calender } from "components/calender"
import { json } from "stream/consumers"

interface IndexPageProps {
  dates: any[];
  header: any;
}

export default function CalenderPage({ header, dates }: IndexPageProps) {
  const dataDates = JSON.stringify(dates);

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
        <h1>Calender</h1>

        
        <Calender dates={dataDates} />
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
        "fields[node--article]": "title,field_date",
        include: "node_type,uid",
        sort: "-created",
      },
    }
  )
  // get only the dates on field_date
  const dates = nodes.map((node) => {
    // only return the date and title
    return {
      date: node.field_date,
      title: node.title,
    }
  })
  
  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )

  return {
    props: {
      dates,
      header,
    },
  }
}