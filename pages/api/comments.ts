import { NextApiRequest, NextApiResponse } from "next"
import { createComment, drupal } from "lib/drupal"
import { absoluteUrl } from "lib/utils"
import { create } from "domain";


export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method === "POST") {
      console.log(request, 'response auth.ts');
      
      createComment(request.body);

      response.status(200).end()
    }
  } catch (error) {
    return response.status(400).json(error.message)
  }
}