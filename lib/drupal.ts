import { DrupalClient, DrupalMenuLinkContent, DrupalNode } from "next-drupal"

export const drupal = new DrupalClient(
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  {
    previewSecret: "jQ7pR9oZ2L5nWc4K8uE3z",
    // jwt token as auth, get it from cookie
    // auth: "Bearer " + "eyJpYXQiOjE3MTA5MzA1NTAsImV4cCI6MTcxMDkzMDg1MCwiZHJ1cGFsIjp7InVpZCI6IjEifX0"
    
    auth: () => 
    "Basic " +
    Buffer.from(
      `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
    ).toString("base64"),
  }
)

// this returns the articles, with the needed fields for the teaser
export const articleTeaser = (context, limit? : Number) => drupal.getResourceCollectionFromContext<DrupalNode[]>(
  "node--article",
  context,
  { 
    params: {
      "filter[status]": 1,
      'page[limit]': limit,
      "fields[node--article]": "title,path,field_image,uid,created,body,field_article_content",
      include: "node_type,uid,field_image,field_article_content.field_image",
      sort: "-created",
    },
  }
)

// this returns the events, with the needed fields for the teaser
export const eventTeaser = (context, limit? : Number) => drupal.getResourceCollectionFromContext<DrupalNode[]>(
  // content: title (has word "")
  "node--event",
  context,
  { 
    params: {
      "filter[status]": 1,
      "filter[field_past_date]": 0,
      'page[limit]': limit,
      "fields[node--event]": "title,path,uid,field_hero_image_source,field_genre,field_country,field_date,field_city,field_favourite_users",
      include: "node_type,uid,field_genre,field_country",
      sort: "field_date",
    },
    withAuth: true,
  }
)

// this returns the header content for the home page
export const headerIndex = () => drupal.getResource(
  "node--page",
  "602b4cc5-6b79-4bd7-9054-d24ac27c2142",
  {
    params: {
      "fields[node--page]": "title,body",
    },
  }
)

// this returns the genres taxonomy terms
export const taxTermGenre = (context) => drupal.getResourceCollectionFromContext<DrupalMenuLinkContent[]>(
  "taxonomy_term--genre",
  context,
  { 
    params: {
      "filter[status]": 1,
      "fields[taxonomy_term--genre]": "name",
      include: "vid",
      sort: "name",
    },
  }
)

// this returns the country taxonomy terms
export const taxTermCountry = (context) => drupal.getResourceCollectionFromContext<DrupalMenuLinkContent[]>(
  "taxonomy_term--country",
  context,
  { 
    params: {
      "filter[status]": 1,
      "fields[taxonomy_term--country]": "name",
      include: "vid",
      sort: "name",
    },
  }
)

export const createComment = (formState) => drupal.createResource(
  "comment--comment",
  {
    data: {
      attributes: {
        entity_type: "node",
        field_name: "field_comments",
        subject: formState.subject,
        comment_body: {
          value: formState.comment_body,
          format: "plain_text",
        },
      },
      relationships: {
        entity_id:  {
          data: {
            type: "node--article",
            id: formState.entity_id,
          }
        },
        uid: {
          data: {
            type: "user--user",
            id: formState.uid,
          },
        },
      },
    }
  }
)

export const getComments = (context, id) => {
  console.log(id, 'id');
  
  return drupal.getResourceCollectionFromContext(
    "comment--comment",
    context,
    {
      params: {
        "filter[entity_id.id]": id, // Update the nested filter
        "fields[comment--comment]": "subject,comment_body,created,relationships.entity_id,uid",
        include: "entity_id,uid",
        sort: "-created",
      },
    }
  );
};


export const getAllUsers = (user?) => drupal.getResourceCollection(
  "user--user",
  {
    params: {
      "fields[user--user]": "name,mail,display_name",
      include: "roles",
      sort: "name",
    },
    withAuth: true,
  }
);


export const getAccessToken = (credentials) => drupal.getAccessToken(credentials);
