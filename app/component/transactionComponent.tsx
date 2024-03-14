import { Transaction, Transactions } from "@/interfaces/interface-dogeapi";

export default function TransactionsComponent({ transactions, success }: Transactions) {
  if (success) {
    return (
      <div className="bg-slate-100 p-3 rounded">
        <p> Transactions : {transactions.length}</p>
        {transactions.map((transaction: Transaction, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-2 bg-slate-200 px-4 p-2">
              <p>hash : {transaction.hash}</p>
              <p>value : {transaction.value}</p>
              <p>time : {transaction.time}</p>
              <p>block : {transaction.block}</p>
              <p>price : {transaction.price}</p>
            </div>
          )
        })}
      </div>
    )
  }

  return null;
}
