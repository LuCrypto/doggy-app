import { NextApiRequest, NextApiResponse } from "next";
import { Transactions } from "@/interfaces/interface-dogeapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handling errors
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req?.body) {
    return res.status(400).json({ error: 'Missing body' });
  }

  if (!JSON.parse(req.body)?.address) {
    return res.status(400).json({ error: 'Missing address' });
  }

  if (!JSON.parse(req.body)?.page) {
    return res.status(400).json({ error: 'Missing page' });
  }

  // Get the address from the request
  const address = JSON.parse(req.body).address;
  const page = JSON.parse(req.body).page;
  const url = 'https://dogechain.info/api/v1/address/transactions/';
  const fullUrl = url + address + '/' + page;

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

    const fakeData = {
      transactions: [
        {
          hash: "8c493d6fc2bdeeb3eed52c441028792c599e10e217d98c56fb0da872934458f0",
          value: "13.11000000",
          time: 1669045644,
          block: 4481956,
          price: "0.08467205"
        },
      ],
      success: 1
    }

    // const data: Transactions = await response.json();
    return res.status(200).json(fakeData);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: 'Failed to fetch doge api' });
  }
}

export default handler;
