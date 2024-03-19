import { drupal } from "lib/drupal";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    if (request.method === "POST") {
      if (request.body.newUserUid) {
        const event = await drupal.updateResource(
          "node--event",
          request.body.id,
          {
           data: {
            relationships: {
              // keep the other relationships
              field_favourite_users: {
                data: [
                  { type: "user--user", id: request.body.newUserUid},
                  ...request.body.users.filter((user) => user.id !== request.body.newUserUid)
                ]
              },
            },
          },
        });
      }
      else {
        const event = await drupal.updateResource(
          "node--event",
          request.body.id,
          {
           data: {
            relationships: {
              // keep the other relationships
              field_favourite_users: {
                data: request.body.users,
              },
            },
          },
        });
      }

  
      response.status(200).end();
    }
  } catch (error) {
    return response.status(400).json(error.message);
  }
}