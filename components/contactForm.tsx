import * as React from 'react';

import { resolveWebformContent, Webform } from 'nextjs-drupal-webform';

import { GetStaticPathsContext } from 'next/types';

import { GetStaticPathsResult } from 'next';

import { useRouter } from 'next/router';
import { drupal } from 'lib/drupal';



export function ContactForm({webform, id}) {
  return (
    <div>
      <h1>{webform.title}</h1>
      <Webform
        id={id}
        data={webform}
        className="form-test-class"
        noValidate={true}
      />
    </div>
  );

}


// export async function getStaticPaths(
//   context: GetStaticPathsContext,
// ): Promise<GetStaticPathsResult> {
//   const entities = await drupal.getResourceCollectionFromContext(
//     'webform--webform',
//     context,
//   );

//   const paths = entities.map((entity) => {
//     return { params: { webform_id: entity.drupal_internal__id } };
//   });

//   return {

//     paths: [...paths],

//     fallback: false,

//   };

// }


export async function getStaticProps(context) {

  const webform = await resolveWebformContent(

    context.params.webform_id,

    drupal,

  );


  return {

    props: {

      webform,

      id: context.params.webform_id,

    },

    revalidate: 1,

  };

}