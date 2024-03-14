'use client';

import { useState } from "react";
import { Balance, Received, Sent, UnspentOutputs, UnspentOutputAtomical, Transactions, Transaction } from "@/interfaces/interface-global-dogeapi";
import { getAmountReceived, getAmountSent, getBalance, getTransactions, getUnspentOutputs } from "./api";
import BalanceComponent from "./component/balanceComponent";
import ReceivedComponent from "./component/receivedComponent";
import SentComponent from "./component/sendComponent";
import UnspendOutputComponent from "./component/utxoComponent";
import TransactionsComponent from "./component/transactionsComponent";
import TransactionComponent from "./component/transactionComponent";

export default function Home() {
  // Variables
  const [inputValue, setInputValue] = useState('');

  const [resultBalance, setBalance]: [Balance, any] = useState({ balance: '', confirmed: '', unconfirmed: '', success: 0 });
  const [resultAmountReceived, setAmountReceived]: [Received, any] = useState({ received: '', success: 0 });
  const [resultAmountSent, setAmountSent]: [Sent, any] = useState({ sent: '', success: 0 });
  const [resultUnspentOutputs, setUnspentOutputs]: [UnspentOutputs, any] = useState({ unspent_outputs: [], success: 0 });
  const [resultTransactions, setTransactions]: [Transactions, any] = useState({ transactions: [], success: 0 });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  // State
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const reset = () => {
    setLoading(true)
    setBalance({ balance: '', confirmed: '', unconfirmed: '', success: 0 })
    setAmountReceived({ received: '', success: 0 })
    setAmountSent({ sent: '', success: 0 })
    setUnspentOutputs({ unspent_outputs: [], success: 0 })
    setTransactions({ transactions: [], success: 0 })
    setError('')
  }

  return (
    <main className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <form
          className="flex flex-col w-6/12 gap-4"
          onSubmit={async (event) => {
            event.preventDefault(); // Empêche le rechargement de la page

            reset();

            const arrayPromise = [
              getBalance(inputValue, setError, setBalance),
              getAmountReceived(inputValue, setError, setAmountReceived),
              getAmountSent(inputValue, setError, setAmountSent),
              getUnspentOutputs(inputValue, setError, setUnspentOutputs),
              getTransactions(inputValue, 1, setError, setTransactions),
            ];

            await Promise.all(arrayPromise).then(() => {
              setLoading(false);
            });
          }}
        >
          <p className="text-4xl">Enter your doge address</p>
          <input
            type="text"
            placeholder="0x..."
            className="input input-bordered w-full"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn text-xl"
            disabled={!inputValue.trim()} // Désactiver le bouton si l'input est vide
          >
            Submit
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </button>
        </form>
        {resultBalance.balance === '' && error !== '' && <p className="text-red-600 bg-slate-100 p-3 rounded">{error}</p>}
        <BalanceComponent
          balance={resultBalance.balance}
          confirmed={resultBalance.confirmed}
          unconfirmed={resultBalance.unconfirmed}
          success={resultBalance.success}
        />
        <ReceivedComponent
          received={resultAmountReceived.received}
          success={resultAmountReceived.success}
        />
        <SentComponent
          sent={resultAmountSent.sent}
          success={resultAmountSent.success}
        />
        <UnspendOutputComponent
          unspent_outputs={resultUnspentOutputs.unspent_outputs}
          success={resultUnspentOutputs.success}
        />
        <TransactionsComponent
          transactions={resultTransactions.transactions}
          success={resultTransactions.success}
        />
      </div>
    </main>
  )
}
