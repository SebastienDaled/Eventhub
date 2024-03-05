import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
  console.log(node, 'node article');
  
  return (
    <>
      <div className="eventPage__header">
        <div className="eventPage__header__image">
        <Image
            src={absoluteUrl(node.field_image[0].uri.url)}
            alt={`The hero image of ${node.field_image[0].alt}`}
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
        <div className="content__small">
          {node.field_alinea && (
            node.field_alinea.map((alinea, index) => {
              
              return (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: alinea.field_text }} />
                  <Image
                    src={absoluteUrl(alinea.field_image.uri.url)}
                    alt={`image for ${alinea.field_image.alt}`}
                    width={3000}
                    height={1000}
                    sizes="(max-width: 3000px) 100vw, 3000px"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              )
            }
          ))}
        </div>
        
      </article>
      </div>
    </>
  )
}
