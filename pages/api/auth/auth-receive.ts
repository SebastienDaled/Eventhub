import { NextApiRequest, NextApiResponse } from "next"
import { drupal } from "lib/drupal"
import { absoluteUrl } from "lib/utils"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {

    console.log(request.body, 'request.body after drupal');
    if (request.method === "POST") {
     
      
      response.status(200).end()
    }
  } catch (error) {
    return response.status(400).json(error.message)
  }
}