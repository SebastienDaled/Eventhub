import Head from "next/head"
import { GetStaticPropsResult } from "next"

import { DrupalNode } from "next-drupal"
import { drupal } from "lib/drupal"

import { Layout } from "components/layout"
import { Calender } from "components/calender"

interface IndexPageProps {
  dates: any[];
}

export default function CalenderPage({ dates }: IndexPageProps) {
  const dataDates = JSON.stringify(dates);

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
        "fields[node--article]": "title,field_date,slug,path",
        include: "node_type,uid",
        sort: "-created",
      },
    }
  )
  
  const dates = nodes.map((node) => {
    // only return the date and title
    return {
      date: node.field_date,
      title: node.title,
      path: node.path.alias,
    }
  })

  return {
    props: {
      dates,
    },
  }
}