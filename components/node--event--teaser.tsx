import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"

import { formatDate } from "lib/utils"

interface NodeEventTeaserProps {
  node: DrupalNode
}

export function NodeEventTeaser({ node, ...props }: NodeEventTeaserProps) {
  // remove <p> and </p> from the body
  // make it only 60 characters long
  
  return (
   <Link href={`${node.path.alias}`}>
     <article {...props} className="eventcard">
      <div className="eventcard__mask"></div>
      {node.field_hero_image_source && (
        <figure className="">
          <Image
            src={node.field_hero_image_source}
            alt={"een image van " + node.title}
            width={768}
            height={480}
          />
        </figure>
      )}
      <div className="eventcard__info">
        <h2>{node.title}</h2>
        {/* <p>{bodeSummary}</p> */}
        <div className="eventcard__info__extra">
          <span>{formatDate(node.field_date)}</span>
          <span>{node.field_city}</span>
        </div>
      </div>
    </article>
  </Link>
  )
}
