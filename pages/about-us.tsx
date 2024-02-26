import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"
import Image from "next/image"
import { absoluteUrl } from "lib/utils"

interface IndexPageProps {
  nodes: any;
  header: any;
  allImages: any;
}

export default function AboutUsPage({ nodes, header, allImages }: IndexPageProps) {
  console.log(nodes, 'nodes');
  
  console.log(allImages, 'allImages');
  

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
        <h1>{nodes.title}</h1>

        <div className="content">
          {nodes.body && nodes.body.map((text, index) => (
            

            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: text.value }} />

              <Image 
                src={absoluteUrl(allImages.find((image) => image.id === nodes.field_image[index].id)?.uri.url)}
                alt={nodes.field_image[index].resourceIdObjMeta.alt}
                width={nodes.field_image[index].resourceIdObjMeta.width}
                height={nodes.field_image[index].resourceIdObjMeta.height}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // node--event
  const nodes = await drupal.getResource(
    "node--page",
    "609f5d4e-4e18-4cda-a252-f227c990d564",
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

  const allImages = await drupal.getResourceCollectionFromContext(
    "file--file",
    context,
    { 
      params: {
        "filter[status]": 1,
        "fields[file--file]": "filename,uri",
        include: "uid",
        sort: "-created",
      },
    }
  )

  return {
    props: {
      nodes,
      header,
      allImages,
      
    },
  }
}