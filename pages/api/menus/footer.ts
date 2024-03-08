// this is a ts file in pages/api folder, get the manu from drupal and return it
// so that it can be used in the layout component

import { drupal } from "lib/drupal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const topFooter = await drupal.getMenu("footer");

    const menuData = {
      topFooter: topFooter,
    }

    response.status(200).json(menuData);
  } catch (error) {
    return response.status(400).json(error.message);
  }
}