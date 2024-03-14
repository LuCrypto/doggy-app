import { TransactionFromAddress, Transactions } from "@/interfaces/interface-global-dogeapi";
import Link from "next/dist/client/link";
import { useState } from "react";
import TransactionComponent from "./transactionComponent";
import { getTransaction } from "../api";

export default function TransactionsComponent({ transactions, success }: Transactions) {
  // Variables
  const [resultDetailledTransaction, setDetailledTransaction]: [any, any] = useState({ transaction: {}, success: -1 });

  const [error, setError] = useState('Error for the transaction details');
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);

  if (success) {
    return (
      <div className="w-6/12 bg-slate-100 p-3 rounded">
        <p> Transactions : {transactions.length}</p>
        {transactions.map((transaction: TransactionFromAddress, index: number) => {
          const hrefInput = "https://dogechain.info/tx/" + transaction.hash;
          return (
            <div key={index} className="flex flex-col gap-2 bg-slate-200 px-4 p-2 overflow-auto">
              <p><Link className="link" href={hrefInput} target="_blank" rel="noreferrer">Hash</Link> : {transaction.hash} </p>
              <p>Value : {transaction.value} DOGE</p>
              <p>Time : {transaction.time} ({new Date(transaction.time * 1000).toLocaleString()})</p>
              <p>Block : {transaction.block}</p>
              <p>Price : {transaction.price} DOGE</p>
              <div>
                <button className="bg-slate-300 p-1 rounded" onClick={async (event) => {
                  event.preventDefault(); // Empêche le rechargement de la page
                  if (open) {
                    setOpen(false);
                    return;
                  }

                  setLoading(true);
                  setDetailledTransaction({ transaction: {}, success: -1 });

                  const arrayPromise = [
                    getTransaction(transaction.hash, setError, setDetailledTransaction),
                  ]

                  await Promise.all(arrayPromise).then(() => {
                    setLoading(false);
                    setOpen(true);
                  });
                }}>Details
                  {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}
                </button>
                {resultDetailledTransaction && resultDetailledTransaction.success === 0 && (
                  <p className="text-red-600 bg-slate-100 p-3 rounded">{error}</p>
                )}
                {open && (
                  <TransactionComponent
                    transaction={resultDetailledTransaction.transaction}
                    success={resultDetailledTransaction.success}
                  />
                )}

              </div>
            </div>
          )
        })
        }
      </div >
    )
  }

  return null;
}
