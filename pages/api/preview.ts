import { NextApiRequest, NextApiResponse } from "next"

import { drupal } from "lib/drupal"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log(request, 'request preview.ts');
  
  return await drupal.preview(request, response)
}
