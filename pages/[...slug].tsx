import Head from "next/head"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"

import { DrupalNode } from "next-drupal"
import { drupal, getComments } from "lib/drupal"

import { Layout } from "components/layout"
import { NodeArticle } from "components/node--article"
import { NodeBasicPage } from "components/node--basic-page"
import { NodeEvent } from "components/node--event"
import { Webform } from "components/webform"

import Yaml from 'js-yaml';

const RESOURCE_TYPES = ["node--page", "node--article"]

interface NodePageProps {
  resource: DrupalNode
  related: DrupalNode[]
  webform: any
  comments: any
}

export default function NodePage({ resource, related, webform, comments }: NodePageProps) {
  if (!resource) return null
  console.log(resource);
  
  return (
    <Layout>
      <Head>
        <title>{resource.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      {resource.type === "node--page" && <NodeBasicPage node={resource} />}
      {resource.type === "node--article" && <NodeArticle node={resource} other={related} comments={comments}/>}
      {resource.type === "node--event" && <NodeEvent node={resource} related={related}/>} 
     
        {resource.type === "webform--webform" &&  <div className="corePage"><Webform element={webform} id={resource.title} /></div>}
      
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
      "fields[node--article]": "title,uid,body,field_image,,field_article_content,field_comments",
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

  let other = {
    type: "node--event",
    params: {}
  };

  if (resource.type === "node--event") {
    other.type = "node--event";
    other.params = {
      "filter[status]": 1,
      "filter[field_past_date]": 0,
      "fields[node--event]": "title,path,field_image,uid,created,field_hero_image_source,body,field_city,field_date,field_genre,field_country,field_favourite_users",
      include: "node_type,uid,field_genre,field_country,field_favourite_users",
      sort: "-field_date",
    }
  } else if (resource.type === "node--article") {
    other.type = "node--article";
    other.params = {
      "filter[status]": 1,
      "fields[node--article]": "title,path,field_image,uid,created,body,field_article_content,field_comments",
      include: "node_type,uid,field_image,field_article_content.field_image",
      sort: "-created",
    }
  }

  const related = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    other.type,
    context,
    { 
      params: other.params,
    }
  )

  const webform = await Yaml.load(resource.elements);
  

  console.log(resource.id);
  
  const comments = await getComments(context, resource.id);

  return {
    props: {
      resource,
      related,
      webform,
      comments,
    },
  }
}
