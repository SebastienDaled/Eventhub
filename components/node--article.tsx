import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {  
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
            priority={true}
          />
        </div>
          <div className="eventPage__title">
            <h1>{node.title}</h1>
          </div>
      </div>
      <div className="core">
        <article {...props}>
        <div className="content__small">
          {node.field_article_content && (
            node.field_article_content.map((content, index) => {
              
              if (!content.field_image && !content.field_video_link && !content.field_text) return null

              return (
                <div key={index}>
                  {content.type === 'paragraph--text_image_block' && (
                      <div className="content__small_2">
                        <div dangerouslySetInnerHTML={{ __html: content.field_text }} />
                        <Image
                          src={absoluteUrl(content.field_image.uri.url)}
                          alt={`image for ${content.field_image.alt}`}
                          width={3000}
                          height={1000}
                          sizes="(max-width: 3000px) 100vw, 3000px"
                      />
                      </div>
                  )}

                  {content.type === 'paragraph--image_text_block' && (
                    <div className="content__small_2">
                      <Image
                        src={absoluteUrl(content.field_image.uri.url)}
                        alt={`image for ${content.field_image.alt}`}
                        width={3000}
                        height={1000}
                        sizes="(max-width: 3000px) 100vw, 3000px"
                      />
                      <div dangerouslySetInnerHTML={{ __html: content.field_text }} />
                    </div>
                  )}

                  {content.type === "paragraph--video" && (
                    <div className="iframe-container">
                        <iframe
                        src={content.field_video_link}
                        frameBorder="0"
                        allowFullScreen
                        className="responsive-iframe"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      ></iframe>
                    </div>
                  )}
                  
                  {content.type === "paragraph--image" && (
                    <Image
                    src={absoluteUrl(content.field_image.uri.url)}
                    alt={`image for ${content.field_image.alt}`}
                    width={3000}
                    height={1000}
                    sizes="(max-width: 3000px) 100vw, 3000px"
                  />
                  )}

                  {content.type === "paragraph--text" && (
                    <div className="paragraph__text" dangerouslySetInnerHTML={{ __html: content.field_text }} />
                  )}
                </div>
              )
            }
          ))}
        </div>
        <input type="checkbox" name="" id="" />
        </article>
      </div>
    </>
  )
}
