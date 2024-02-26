import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleProps {
  node: DrupalNode
}

export function NodeEvent({ node, ...props }: NodeArticleProps) {
  return (
    <div className="core">
      <article {...props}>
      <h1>dsdsdfsd</h1>
      </article>
    </div>
  )
}
