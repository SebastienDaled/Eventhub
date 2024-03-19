import { NextApiRequest, NextApiResponse } from "next"
import { drupal, getAllUsers } from "lib/drupal"
import { absoluteUrl } from "lib/utils"
import { parse } from "path";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method === "POST") {
      console.log(response, 'response auth.ts');
      console.log(request, 'request.body line 12');
      const url = absoluteUrl("/user/login?_format=json")
      // Submit to Drupal.
      const user = await fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          name: request.body.username,
          pass: request.body.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error, 'error 36');
      }
      );
      console.log(user, 'user 39');      

      if (!user.current_user) {
        throw new Error(user.message)
      } else if (user.csrf_token) {
        const users = await getAllUsers();
        const currentUser = users.find((user) => user.display_name === request.body.username);
        const currentUserId = currentUser.id;

        user.uid = currentUserId;

        const idCookie = `uid=${currentUserId}; path=/;`;
        const xCsrfTokenCookie= `X-CSRF-Token=${user.csrf_token}; path=/;`;
        const tokenCookie = `token=${user.access_token}; path=/;`;

        response.setHeader('Set-Cookie', [idCookie, xCsrfTokenCookie, tokenCookie]);
        
      }
      
      response.status(200).json(user)
    }
  } catch (error) {
    return response.status(400).json(error.message)
  }
}