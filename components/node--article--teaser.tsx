import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleTeaserProps {
  node: DrupalNode
}

export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
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
                alt={"een image van " + node.title}
              />
          </figure>
        )}
        <div className="eventcard__info">
          <h2>{node.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: node.field_article_content[0].field_text.substring(0, 100)}} />
          <div className="eventcard__info__extra">
            <span>{formatDate(node.created)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
