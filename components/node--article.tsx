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
            alt={node.field_image.alt}
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
        {/* <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
        {node.field_image && (
          <figure>
            <Image
              src={absoluteUrl(node.field_image[0].uri.url)}
              width={768}
              height={400}
              alt={node.field_image.resourceIdObjMeta?.alt}
              priority
            />
            {node.field_image[0].resourceIdObjMeta?.title && (
              <figcaption className="py-2 text-sm text-center text-gray-600">
                {node.field_image.resourceIdObjMeta.title}
              </figcaption>
            )}
          </figure>
        )}
        {node.body?.processed && (
          <div
            dangerouslySetInnerHTML={{ __html: node.body?.processed }}
            className="mt-6 font-serif text-xl leading-loose prose"
          />
        )} */}
        <div className="content__small">
          {node.field_alinea && (
            node.field_alinea.map((alinea, index) => {
              
              return (
                // <div key={index} dangerouslySetInnerHTML={{ __html: alinea.value }} />
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: alinea.field_text }} />
                  <Image
                    src={absoluteUrl(alinea.field_image.uri.url)}
                    alt={node.field_image.alt}
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
