import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { useEffect, useState } from "react"

import { drupal, eventTeaser } from "lib/drupal"
import { DrupalNode } from "next-drupal"

import { Layout } from "components/layout"
import { NodeEventTeaser } from "components/node--event--teaser"

interface IndexPageProps {
  nodes: DrupalNode[];
}

export default function FavouritesPage({ nodes }: IndexPageProps) {
  const [fvouredNodes, setFvouredNodes] = useState<DrupalNode[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const uid = localStorage.getItem('uid');
      
      if (uid) {
        const favs = nodes.filter((node) => {
          if (node.field_favourite_users.length > 0) {
            console.log(node.field_favourite_users, 'node.field_favourite_users');
            const user = node.field_favourite_users.find((user) => user.id === uid);
            if (user) {
              return true;
            }
          }
          return false;
        });
        setFvouredNodes(favs);
      }
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Favourites | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Favourites</h1>

        {fvouredNodes?.length ? (
          <div className="searchresults" id="">
            <div className="upcomingevents" id="slider">
              {fvouredNodes.map((node) => (
                <div key={node.id}>
                  <NodeEventTeaser node={node} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="py-4">You have no favourites</p>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // node--event
  const nodes = await eventTeaser(context);
  console.log(nodes, 'nodes');
  
  return {
    props: {
      nodes,
    },
  };

}