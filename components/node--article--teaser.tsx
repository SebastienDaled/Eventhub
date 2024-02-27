import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleTeaserProps {
  node: DrupalNode
}

export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
  const bodeSummary = node.body[0]?.processed.replace(/<p>/g, '').replace(/<\/p>/g, '').substring(0, 150);
  

  return (
    <Link href={`${node.path.alias}`}>
      <article {...props} className="eventcard">
        <div className="eventcard__mask"></div>
        {node.field_image && (
          <figure className="my-4">
            <Image
                src={absoluteUrl(node.field_image[0].uri.url)}
                width={768}
                height={480}
                alt={node.field_image.resourceIdObjMeta?.alt}
              />
          </figure>
        )}
        <div className="eventcard__info">
          <h2>{node.title}</h2>
          <p>{bodeSummary}</p>
          <div className="eventcard__info__extra">
            <span>{formatDate(node.created)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
