import { NextApiRequest, NextApiResponse } from "next";
import { BlockHash } from "@/interfaces/interface-dogeapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handling errors
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fullUrl = 'https://dogechain.info/api/v1/block/besthash';

  // Make the request
  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Too many requests');
        return res.status(429).json({ error: 'Too many requests' });
      } else {
        console.error(response.status);
        return res.status(404).json({ error: 'Failed to fetch doge api' });
      }
    }

    const data: BlockHash = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: 'Failed to fetch doge api' });
  }
}

export default handler;
