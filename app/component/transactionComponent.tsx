import { Transaction, TransactionFromAddress, Transactions } from "@/interfaces/interface-global-dogeapi";
import Link from "next/dist/client/link";

export default function TransactionsComponent({ transactions, success }: Transactions) {
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
            </div>
          )
        })}
      </div>
    )
  }

  return null;
}
