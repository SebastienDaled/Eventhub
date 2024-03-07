import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { NodeArticle } from "components/node--article"
import { NodeBasicPage } from "components/node--basic-page"
import { Layout } from "components/layout"
import { NodeEvent } from "components/node--event"
import { Webform } from "components/webform"
import Yaml from 'js-yaml';

const RESOURCE_TYPES = ["node--page", "node--article"]

interface NodePageProps {
  resource: DrupalNode
  header: DrupalNode
  related: DrupalNode[]
  menu: any
  webform: any
}

export default function NodePage({ resource, header, related, menu, webform }: NodePageProps) {
  if (!resource) return null

  return (
    <Layout menu={menu}>
      <Head>
        <title>{resource.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      {resource.type === "node--page" && <NodeBasicPage node={resource} />}
      {resource.type === "node--article" && <NodeArticle node={resource} />}
      {resource.type === "node--event" && <NodeEvent node={resource} related={related} />} 
      <div className="corePage">
        {resource.type === "webform--webform" && <Webform element={webform} id={resource.title} />}
      </div>
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi.resourceName

  let params = {}
  if (type === "node--article") {
    params = {
      "fields[node--article]": "title,uid,body,field_image,,field_article_content",
      include: "field_image,uid,field_article_content.field_image",
    }
  }
  if (type === "node--event") {
    params = {
      include: "uid,field_genre,field_country",
    }

  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }

  const header = await drupal.getResource<DrupalNode>(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )

  const related = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--event",
    context,
    { 
      // order it on field_date
      params: {
        "filter[status]": 1,
        "filter[field_past_date]": 0,
        "fields[node--event]": "title,path,field_image,uid,created,field_hero_image_source,body,field_city,field_date,field_genre,field_country",
        include: "node_type,uid,field_genre,field_country",
        sort: "-field_date",
      },
    }
  )

  const menu = await drupal.getMenu("main");

  const webform = await Yaml.load(resource.elements);
  
  return {
    props: {
      resource,
      header,
      related,
      menu,
      webform
    },
  }
}
