import { Transaction, TransactionData } from "@/interfaces/interface-global-dogeapi";

export default function TransactionComponent({ transaction, success }: Transaction) {
  if (success) {
    return (
      <div className="bg-slate-100 p-3 rounded overflow-auto">
        <p> Hash : {transaction.hash}</p>
        <p> Confirmations : {transaction.confirmations}</p>
        <p> Size : {transaction.size}</p>
        <p> Vsize : {transaction.vsize}</p>
        <p> Weight : {transaction.weight}</p>
        <p> Version : {transaction.version}</p>
        <p> Locktime : {transaction.locktime}</p>
        <p> Block hash : {transaction.block_hash}</p>
        <p> Time : {transaction.time} ({new Date(transaction.time * 1000).toLocaleString()})</p>
        <p> Inputs n : {transaction.inputs_n}</p>
        <p> Inputs value : {transaction.inputs_value} DOGE</p>
        <p> Fee : {transaction.fee} DOGE</p>
        <p> Price : {transaction.price} DOGE</p>
      </div>
    )
  }

  return null;
}
