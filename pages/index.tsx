import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { useEffect, useRef, useState } from "react"

import { drupal } from "lib/drupal"
import { DrupalNode } from "next-drupal"

import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"
import { NodeEventTeaser } from "components/node--event--teaser"
import { Timer } from "lib/utils"

interface IndexPageProps {
  nodes: DrupalNode[]
  header: any
  articles: DrupalNode[]
}


export default function IndexPage({ nodes, header, articles }: IndexPageProps) {
  const [eventsDisplayed, setEventsDisplayed] = useState(0);

  const homeTitleRef = useRef(null);
  const homeDescRef = useRef(null);
  let bodeSummary = header.body[0].processed.replace(/<p>/g, '').replace(/<\/p>/g, '');


  useEffect(() => {
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${eventsDisplayed * 33.7}%)`;
    const timer = new Timer(() => {
      if (eventsDisplayed < 2) {
        setEventsDisplayed(eventsDisplayed + 1);
      } else {
        setEventsDisplayed(0);
      }
    }, 8000);

    return () => {
      timer.stop();
    }
  }, [eventsDisplayed]);
  
  useEffect(() => {
    if (homeTitleRef.current && homeDescRef.current) {
      homeTitleRef.current.style.transform = 'translateY(0)';
      homeTitleRef.current.style.opacity = '1';
      homeDescRef.current.style.transform = 'translateY(0)';
      homeDescRef.current.style.opacity = '1';
    }
  }, [homeTitleRef, homeDescRef]);
  
  
  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <header>
          <div className="assets">
            <div className="circleSmall circleSmall--left"></div>
            <div className="circleBig"></div>
            <div className="circleSmall circleSmall--right"></div>
          </div>
          <div className="headerInfo">
            <h1 ref={homeTitleRef}>{header.title}</h1>
            <p ref={homeDescRef}>{bodeSummary}</p>
          </div>
      </header>

      <div className="topContainer">
        <h2 className="subtitle">Upcoming Events</h2>
        
        <div className="">
          {nodes?.length ? (
            <div className="container" id="">
              <div className="upcomingevents" id="slider">
                {nodes.map((node) => (
                  <div key={node.id}>
                    <NodeEventTeaser node={node} />
                  </div>
                ))}
              </div>
              <div className="dots">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className={`dot ${i === eventsDisplayed ? 'activeDot' : ''}`} onClick={() => setEventsDisplayed(i)}></div>
                ))}
              </div>
            </div>
          ) : (
            <p className="py-4">No nodes found</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="subtitle">Latest articles</h2>

        <div className="latestArticles">
          {articles?.length ? (
            articles.map((node) => (
              <div key={node.id}>
                <NodeArticleTeaser node={node} />
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
  // node--event
  // max 3 events
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--event",
    context,
    { 
      params: {
        "filter[status]": 1,
        "filter[field_past_date]": 0,
        'page[limit]': 9,
        "fields[node--event]": "title,path,field_image,uid,created,field_hero_image_source,body,field_city,field_date",
        include: "node_type,uid",
        // ascending
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
        'page[limit]': 6,
        "fields[node--article]": "title,path,field_image,uid,created,body,field_article_content",
        include: "node_type,uid,field_image,field_article_content",
        sort: "-created",
      },
    }
  )


  const header = await drupal.getResource(
    "node--page",
    "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
    {
      params: {
        "fields[node--page]": "title,body",
      },
    }
  )
  
  return {
    props: {
      nodes,
      header,
      articles,
    },
  }
}