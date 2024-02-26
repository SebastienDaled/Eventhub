import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeEventTeaserProps {
  node: DrupalNode
}

export function NodeEventTeaser({ node, ...props }: NodeEventTeaserProps) {
  console.log(node);
  // remove <p> and </p> from the body
  let bodeSummary = node.body[0].processed.replace(/<p>/g, '').replace(/<\/p>/g, '');
  // make it only 60 characters long
  bodeSummary = bodeSummary.substring(0, 150);
  
  return (
   <Link href={`${node.path.alias}`}>
     <article {...props} className="eventcard">
      <div className="eventcard__mask"></div>
      {node.field_hero_image_source && (
        <figure className="my-4">
          {/* <Image
            src={node.field_hero_image_source}
            width={768}
            height={480}
            alt={node.field_hero_image_source}
          /> */}
          <img src={node.field_hero_image_source} alt="" />
        </figure>
      )}
      <div className="eventcard__info">
        <h2>{node.title}</h2>
        <p>{bodeSummary}</p>
        <div className="eventcard__info__extra">
          <span>{formatDate(node.field_date)}</span>
          <span>{node.field_city}</span>
        </div>
      </div>
    </article>
  </Link>
  )
}
