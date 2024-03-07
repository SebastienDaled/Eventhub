import { NextApiRequest, NextApiResponse } from "next"
import { drupal } from "lib/drupal"
import { absoluteUrl } from "lib/utils"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method === "POST") {
      const url = absoluteUrl("/webform_rest/submit")
      console.log(request.body, 'request.body');
      
      // Submit to Drupal.
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          ...request.body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!result.ok) {
        throw new Error()
      }

      response.status(200).end()
    }
  } catch (error) {
    return response.status(400).json(error.message)
  }
}