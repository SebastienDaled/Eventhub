import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { useEffect, useState } from "react"

import { DrupalNode } from "next-drupal"
import { articleTeaser, drupal, eventTeaser } from "lib/drupal"

import { Layout } from "components/layout"
import { NodeEventTeaser } from "components/node--event--teaser"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

interface IndexPageProps {
  nodes: DrupalNode[];
  articles: DrupalNode[];
}

const params = new DrupalJsonApiParams();

export default function SearchPage({ nodes, articles }: IndexPageProps) {
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
    <Layout>
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
  context,
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await eventTeaser(context);

  const articles = await articleTeaser(context);

  return {
    props: {
      nodes,
      articles,
    },
  }
}