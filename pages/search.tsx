import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"
import { use, useEffect, useState } from "react"

interface IndexPageProps {
  nodes: DrupalNode[];
  articles: DrupalNode[];
  header: any;
  menu: any;
}

export default function SearchPage({ nodes, header, articles, menu }: IndexPageProps) {
  const [events, setEvents] = useState(nodes);
  const [articlesNodes, setarticlesNodes] = useState(articles);
  const [filteredNodes, setFilteredNodes] = useState(nodes);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    let results : DrupalNode[];
    if (searchType === "all") {
      results = events.concat(articles);
    } else if (searchType === "events") {
      results = events;
    } else if (searchType === "articles") {
      results = articlesNodes;
    }

    results = results.filter((node) => {
      return node.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    setFilteredNodes(results);

    if (results.length === 0) {
      setNoResults(true);
      
    } else {
      setNoResults(false);
    }
  }
  , [searchTerm, searchType, events, articles, nodes]);


  return (
    <Layout node={header} menu={menu}>
      <Head>
        <title>Search | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Search</h1>

        <div className="searchFields">
          <input className="searchInput" type="text" placeholder="search for events or articles..." onChange={
            (e) => setSearchTerm(e.target.value)
          }/>
          {/* dropdown menu  */}
          <select name="type" id="type" className="searchSelect" onChange={
            (e) => setSearchType(e.target.value)
          }>
            <option value="all">All</option>
            <option value="events">Events</option>
            <option value="articles">Articles</option>
          </select>
        </div>

        <div className="searchResults">
          {filteredNodes.map((node) => {
            if (node.type === "node--event") {
              return <NodeEventTeaser key={node.id} node={node} />;
            } else if (node.type === "node--article") {
              return <NodeArticleTeaser key={node.id} node={node} />;
            }
          }
          )}
          {noResults && <p className="noResults">No results found</p>}
        </div>
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
        "filter[field_past_date]": 0,
        "fields[node--event]": "title,path,field_image,uid,created,field_hero_image_source,body,field_date,field_country,field_city",
        include: "node_type,uid",
        sort: "field_date",
      },
    }
  )

  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    { 
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_image,uid,created,body,field_alinea",
        include: "node_type,uid,field_image,field_alinea",
        sort: "-created",
      },
    }
  )
  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  )

  const menu = await drupal.getMenu("main");

  return {
    props: {
      nodes,
      articles,
      header,
      menu,
    },
  }
}