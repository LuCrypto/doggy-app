import { NextApiRequest, NextApiResponse } from "next";
import { Transaction } from "@/interfaces/interface-global-dogeapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handling errors
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req?.body) {
    return res.status(400).json({ error: 'Missing body' });
  }

  if (!JSON.parse(req.body)?.transactionHash) {
    return res.status(400).json({ error: 'Missing transaction hash' });
  }

  // Get the transaction hash from the request
  const transactionHash = JSON.parse(req.body).transactionHash;
  const url = 'https://dogechain.info/api/v1/transaction/';
  const fullUrl = url + transactionHash;

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

    const fakeData: Transaction = {
      success: 1,
      transaction: {
        hash: "bcc4ce3f004b02b50456976dfc4de69d651ba718ce95422f51cd1d4bf7235abb",
        confirmations: 4486846,
        size: 225,
        vsize: 225,
        weight: null,
        version: 1,
        locktime: 0,
        block_hash: "fafdca9b3f2011d7d8d6db2dd5b7930f0fa652076a30dba2e6ff491db17bd403",
        time: 1386537435,
        inputs_n: 1,
        inputs_value: "486418.66069161",
        inputs: [
          {
            pos: 0,
            value: "486418.66069161",
            address: "DS96mv8RfX9whxeT7gS7kc1uBp1BBTUKwM",
            scriptSig: {
              hex: "473044022061449822325883cfce07b499e97803d09383b991a5fff6f0f09382b1f6167174022045d62bf3c3e07045abacf6756a918962f9cb56673a1e973227cb1de3f92a69400121038177629a1a642dfdd419df0d7130836105fdd3a908d9ada870337dbf64f1ef2f"
            },
            previous_output: {
              hash: "27a7986112aa3ab4212f97a022b28278e17d05df341af2d36d6037160126c44c",
              pos: 0
            }
          }
        ],
        outputs_n: 2,
        outputs_value: "486417.66069161",
        outputs: [
          {
            pos: 0,
            value: "481022.94499261",
            type: "pubkeyhash",
            address: "DCVYsve2EMmK1S8G4tfAFQ156jWrNydpnH",
            script: {
              hex: "76a91450a72fbd97332f109a1503727360b90fe8ee825388ac",
              asm: "OP_DUP OP_HASH160 50a72fbd97332f109a1503727360b90fe8ee8253 OP_EQUALVERIFY OP_CHECKSIG"
            },
            spent: {
              hash: "d603190bcb4780b8222a4454eb960a69e76b7f0b56b0f8531ec94427940e5953",
              pos: 0
            }
          },
          {
            pos: 1,
            value: "5394.71569900",
            type: "pubkeyhash",
            address: "DTnt7VZqR5ofHhAxZuDy4m3PhSjKFXpw3e",
            script: {
              hex: "76a914f8783344af8532a73dfa97ebddfcc7527a2c6e5a88ac",
              asm: "OP_DUP OP_HASH160 f8783344af8532a73dfa97ebddfcc7527a2c6e5a OP_EQUALVERIFY OP_CHECKSIG"
            },
            spent: {
              hash: "65ffff51fbf7385d9e0b498f6f2dfaad4d418f74287454ee8e40599fab903128",
              pos: 102
            }
          }
        ],
        fee: "1.00000000",
        price: "0.00000001"
      }
    }

    // const data: Transaction = await response.json();
    return res.status(200).json(fakeData);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: 'Failed to fetch doge api' });
  }
}

export default handler;
