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
}

export default function SearchAiPage({ header }: IndexPageProps) {
  
  
  return (
    <Layout node={header}>
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
          <p>Coming soon</p>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // node--event
  // const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
  //   "node--event",
  //   context,
  //   { 
  //     // order it on field_date
  //     params: {
  //       "filter[status]": 1,
  //       "fields[node--event]": "title,path,field_image,uid,created,field_hero_image_source,body,field_city,field_date,field_genre,field_country",
  //       include: "node_type,uid,field_genre,field_country",
  //       sort: "field_date",
  //     },
  //   }
  // )

  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )

  // const taxonomyTermsCountry = await drupal.getResourceCollectionFromContext<DrupalMenuLinkContent[]>(
  //   "taxonomy_term--country",
  //   context,
  //   { 
  //     params: {
  //       "filter[status]": 1,
  //       "fields[taxonomy_term--country]": "name",
  //       include: "vid",
  //     },
  //   }
  // )

  // const taxonomyTermsGenre = await drupal.getResourceCollectionFromContext<DrupalMenuLinkContent[]>(
  //   "taxonomy_term--genre",
  //   context,
  //   { 
  //     params: {
  //       "filter[status]": 1,
  //       "fields[taxonomy_term--genre]": "name",
  //       include: "vid",
  //     },
  //   }
  // )

  return {
    props: {
      header,
    },
  }
}