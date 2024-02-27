import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleProps {
  node: DrupalNode
}

export function NodeEvent({ node, ...props }: NodeArticleProps) {
  console.log(node, 'node');
  
  return (

   <>
      <div className="eventPage__header">
        <div className="eventPage__header__image">
        <Image
            src={node.field_hero_image_source}
            alt={node.field_hero_image_source.alt}
            width={3000}
            height={1000}
            sizes="(max-width: 3000px) 100vw, 3000px"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
          <div className="eventPage__title">
            <h1>{node.title}</h1>
          </div>
      </div>
      <div className="core">
        <article {...props}>
          <h2 className="subtitle">Info</h2>

          <div className="eventPage__main">
            <div>
              <div>
                <h3>Date</h3>
                <p>{formatDate(node.field_date)}</p>
              </div>
              <div className="eventPage__main--double eventPage__main--other">
                <div>
                  <h3>Country</h3>
                  <p>{node.field_country.name}</p>
                </div>
                <div>
                  <h3>City</h3>
                  <p>{node.field_city}</p>
                </div>
              </div>
              <div>
                <h3>Adress</h3>
                <p>{node.field_adress}</p>
              </div>
              <div>
                <h3>Location</h3>
                <p>{node.field_location}</p>
              </div>

              <div className="eventPage__main--double eventPage__main--other">
                <div>
                  <h3>Sales Start - End Date</h3>
                  <p>{formatDate(node.field_sales_start_date)} - {formatDate(node.field_sales_end_date)}</p>
                </div>
                <div>
                  <h3>Sales Status</h3>
                  {node.field_sales_status ? <button className="btn__on">On Sale</button> : <button className="btn__off">Off Sale</button>}
                </div>
              </div>
                <div>
                  <h3>Genre</h3>
                  <button className="genre">{node.field_genre.name}</button>
                </div>
                <div>
                  <h3>Price</h3>
                  <p>Min: {node.field_min_price} - Max: {node.field_max_price} </p>

                </div>
            </div>
            <div>
              {node.field_image && (
                <Image
                src={node.field_seatmap_image_source}
                alt={node.field_seatmap_image_source.alt}
                width={3000}
                height={100}
                sizes="(max-width: 3000px) 100vw, 3000px"
                objectFit="cover"
                objectPosition="center"
              />
              )}
            </div>
          </div>

        </article>
      </div>
    </>
  )
}
