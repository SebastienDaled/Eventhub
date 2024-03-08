import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { useEffect, useState } from "react"

import { drupal } from "lib/drupal"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"

import { Layout } from "components/layout"
import { NodeEventTeaser } from "components/node--event--teaser"

interface IndexPageProps {
  nodes: DrupalNode[];
  taxonomyTermsCountry: any[];
  taxonomyTermsGenre: any[];
}

export default function EventsPage({ nodes, taxonomyTermsCountry, taxonomyTermsGenre }: IndexPageProps) {
  console.log(nodes, 'nodes');
  
  const [startPage, setStartPage] = useState(0);
  const [nodesArray, setNodesArray] = useState([]);
  const [resetFilters, setResetFilters] = useState(false);

  const [countrys, setCountrys] = useState([]);
  const [genres, setGenres] = useState([]);
  const [date, setDate] = useState('');

  const [extraGenreFilters, setExtraGenreFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const maxNodes = 15;

  const maxPages = (maxNodes) => {
    setNodesArray(nodes.slice(startPage, startPage + maxNodes));
  }

  useEffect(() => {
    if (countrys.length > 0) {
      const filteredNodes = nodes.filter((node) => {
        return countrys.includes(node.field_country.name);
      });
      setNodesArray(filteredNodes);
      setResetFilters(true);
    } else {
      maxPages(maxNodes)
      setResetFilters(false);
    }
  }, [countrys, nodes]);

  useEffect(() => {
    if (genres.length > 0) {
      const filteredNodes = nodes.filter((node) => {
        return genres.includes(node.field_genre.name);
      });
      setNodesArray(filteredNodes);
      setResetFilters(true);
    } else {
      maxPages(maxNodes)
      setResetFilters(false);
    }

  }, [genres, nodes]);

  useEffect(() => {
    if (date) {
      console.log(date, 'date');
      
      const filteredNodes = nodes.filter((node) => {
        const dateNode = new Date(node.field_date).toISOString().split('T')[0];
        return dateNode === date;
      });
      setNodesArray(filteredNodes);
      setResetFilters(true);
    } else {
      maxPages(maxNodes)
      setResetFilters(false);
    }
    
  }, [date, nodes]);

  useEffect(() => {
    setNodesArray(nodes.slice(startPage, startPage + maxNodes));
  }, [nodes, startPage]);

  return (
    <Layout>
      <Head>
        <title>Events | EventHub</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <div className="corePage">
        <h1>Find Events</h1>

        <div className="eventsSearch__container" id="">
          <div className="eventsSearch__container__filter"> 
            <h2>Filters</h2>
            {/* i want filters for Country, Genre, Date and price range from min to max */}
            <div className="eventsSearch__container__filter__country">
              <label htmlFor="country">Country</label>
              {/* checkboxes for countrys */}
              {taxonomyTermsCountry?.length ? (
                taxonomyTermsCountry.slice(0, 5).map((country) => (
                  <div key={country.id}>
                    <input
                      type="checkbox"
                      id={country.id}
                      name={country.id}
                      value={country.id}
                      onClick={() => {
                        const updatedCountrys = [...countrys];
                        const index = updatedCountrys.indexOf(country.name);

                        if (index !== -1) {
                          // Country is already in the array, so remove it
                          updatedCountrys.splice(index, 1);
                        } else {
                          // Country is not in the array, so add it
                          updatedCountrys.push(country.name);
                        }

                        setCountrys(updatedCountrys);
                      }}
                      checked={countrys.includes(country.name)} // Added checked attribute
                      onChange={() => console.log('changed')}
                    />
                    <label htmlFor={country.id}>{country.name}</label>
                    </div>
                ))
              ) : (
                <p className="py-4">No Articles</p>
              )}


            </div>
            <div className="eventsSearch__container__filter__genre">
              <label htmlFor="genre">Genre</label>
              {taxonomyTermsGenre?.length ? (
                taxonomyTermsGenre.slice(0, 5).map((genre) => (
                  <div key={genre.id}>
                    <input
                      type="checkbox"
                      id={genre.id}
                      name={genre.id}
                      value={genre.id}
                      onClick={() => {
                        const updatedGenres = [...genres];
                        const index = updatedGenres.indexOf(genre.name);

                        if (index !== -1) {
                          // Genre is already in the array, so remove it
                          updatedGenres.splice(index, 1);
                        } else {
                          // Genre is not in the array, so add it
                          updatedGenres.push(genre.name);
                        }

                        setGenres(updatedGenres);
                      }}
                      checked={genres.includes(genre.name)} // Added checked attribute
                      onChange={() => console.log('changed')}
                    />
                    <label htmlFor={genre.id}>{genre.name}</label>
                    
                    </div>
                ))
              ) : (
                <p className="py-4">No Articles</p>
              )}

              {!extraGenreFilters ? (<button className="more" onClick={() => setExtraGenreFilters(!extraGenreFilters)}>More</button>) : null}

              {extraGenreFilters ? (
                <div>
                  {taxonomyTermsGenre?.length ? (
                    taxonomyTermsGenre.slice(5).map((genre) => (
                      <div key={genre.id}>
                        <input
                          type="checkbox"
                          id={genre.id}
                          name={genre.id}
                          value={genre.id}
                          onClick={() => {
                            const updatedGenres = [...genres];
                            const index = updatedGenres.indexOf(genre.name);

                            if (index !== -1) {
                              // Genre is already in the array, so remove it
                              updatedGenres.splice(index, 1);
                            } else {
                              // Genre is not in the array, so add it
                              updatedGenres.push(genre.name);
                            }

                            setGenres(updatedGenres);
                          }}
                          checked={genres.includes(genre.name)} // Added checked attribute
                        />
                        <label htmlFor={genre.id}>{genre.name}</label>
                        
                        </div>
                    ))
                  ) : (
                    <p className="py-4">No Articles</p>
                  )}
                </div>
              ) : null}

              {extraGenreFilters ? (<button className="more" onClick={() => setExtraGenreFilters(!extraGenreFilters)}>Less</button>) : null}
            </div>
            <div className="eventsSearch__container__filter__date">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            {resetFilters && (
              <button onClick={() => {
                setCountrys([]);
                setGenres([]);
                setDate('');
                setResetFilters(false);
              }} className="reset_filter">Reset Filters</button>
            )}
          </div>
          <div>
            {nodesArray?.length ? (
                <div className="eventsSearch__container__events" id="slider">
                  {nodesArray.map((node) => (
                    <div key={node.id}>
                      <NodeEventTeaser node={node} />
                    </div>
                  ))}
                </div>
            ) : (
              <p className="py-4">No Events</p>
              )}

            {nodesArray?.length ? (
              <div className="pager">
              <button onClick={() => {
                if (currentPage > 1) {
                  setStartPage(startPage - maxNodes);
                  setCurrentPage(currentPage - 1);
                }
              }}>previous</button>

              <p>{currentPage}</p>

              <button onClick={() => {
                setStartPage(startPage + maxNodes);
                setCurrentPage(currentPage + 1);
              }}>next</button>
            </div>
            ) : null}
          </div>
          
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
      // order it on field_date
      params: {
        "filter[status]": 1,
        "filter[field_past_date]": 0,
        "fields[node--event]": "title,path,uid,field_hero_image_source,field_genre,field_country,field_date,field_city",
        include: "node_type,uid,field_genre,field_country",
        sort: "field_date",
      },
    }
  )
  
    
  const taxonomyTermsCountry = await drupal.getResourceCollectionFromContext<DrupalMenuLinkContent[]>(
    "taxonomy_term--country",
    context,
    { 
      params: {
        "filter[status]": 1,
        "fields[taxonomy_term--country]": "name",
        include: "vid",
        sort: "name",
      },
    }
  )

  const taxonomyTermsGenre = await drupal.getResourceCollectionFromContext<DrupalMenuLinkContent[]>(
    "taxonomy_term--genre",
    context,
    { 
      params: {
        "filter[status]": 1,
        "fields[taxonomy_term--genre]": "name",
        include: "vid",
        sort: "name",
      },
    }
  )

  return {
    props: {
      nodes,
      taxonomyTermsCountry,
      taxonomyTermsGenre,
    },
  }
}