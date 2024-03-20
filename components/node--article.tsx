import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate, timeAgo } from "lib/utils"
import { NodeArticleTeaser } from "./node--article--teaser"
import { CommentForm } from "./commentform"
import { Breadcrumb } from "./breadcrumb"

interface NodeArticleProps {
  node: DrupalNode
  other?: DrupalNode[]
  comments?: any
}

export function NodeArticle({ node, other, comments, ...props }: NodeArticleProps) {  
  other = other.filter((otherNode) => {
    return otherNode.id !== node.id;
  })

  other.slice(0, 3);

  const commentTimaAgo = comments.map((comment) => {
    return timeAgo(comment.created);
  });


  return (
    <>
      <div className="eventPage__header">
        <div className="eventPage__header__image">
        <Image
            src={absoluteUrl(node.field_image[0].uri.url)}
            alt={`The hero image of ${node.field_image[0].alt}`}
            width={3000}
            height={1000}
            sizes="(max-width: 187.5rem) 100vw, 187.5rem"
            priority={true}
          />
        </div>
          <div className="eventPage__title">
            <h1>{node.title}</h1>
          </div>
      </div>
      <div className="core">
        <Breadcrumb />
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
                          sizes="(max-width: 187.5rem) 100vw, 187.5rem"
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
                        sizes="(max-width: 187.5rem) 100vw, 187.5rem"
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
                    sizes="(max-width: 187.5rem) 100vw, 187.5rem"
                  />
                  )}

                  {content.type === "paragraph--text" && (
                    <div className="paragraph__text" dangerouslySetInnerHTML={{ __html: content.field_text }} />
                  )}

                  {content.type === "paragraph--text_video_block" && (
                    <div className="content__small_2">
                      <div dangerouslySetInnerHTML={{ __html: content.field_text }} />
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
                    </div>
                  )}

                  {content.type === "paragraph--video_text_block" && (
                    <div className="content__small_2">
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
                      <div dangerouslySetInnerHTML={{ __html: content.field_text }} />
                    </div>
                  )}

                </div>
              )
            }
          ))}
        </div>

        <CommentForm id={node.id}/>

        {comments && comments.length > 0 && (
          comments.slice(0, 5).map((comment, indx) => (
            <div key={comment.id} className="comment">
              <div className="comment__header">
                <h4>{comment.uid.display_name}</h4>
                <p className="comment__header__time">{commentTimaAgo[indx]}</p>
              </div>
              <h3 className="comment_title">{comment.subject}</h3>
              <div className="comment__body" dangerouslySetInnerHTML={{ __html: comment.comment_body.value }} />
            </div>
          ))
        )}  
        </article>

        {other.length > 0 && (
            <div className="eventPage__related">
              <h2 className="subtitle">Other Articles</h2>
              <div className="otherArticles" id="slider">
                {other.map((node) => (
                  <div key={node.id}>
                    <NodeArticleTeaser node={node} />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </>
  )
}
