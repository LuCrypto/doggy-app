'use client';

import { useState } from "react";
import { Balance, Received, Sent, UnspentOutputs, UnspentOutputAtomical, Transactions, Transaction } from "@/interfaces/interface-dogeapi";

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

  // API calls
  const getBalance = async (inputAddress: String) => {
    const response = await fetch('/api/getBalance', {
      method: 'POST',
      body: JSON.stringify({ address: inputAddress }),
    })

    const data = await response.json()
    if (data.error) {
      setError('Error : ' + data.error)
      return
    }

    setBalance(data)
  }

  const getAmountReceived = async (inputAddress: String) => {
    const response = await fetch('/api/getAmountReceived', {
      method: 'POST',
      body: JSON.stringify({ address: inputAddress }),
    })

    const data = await response.json()
    if (data.error) {
      setError('Error : ' + data.error)
      return
    }

    setAmountReceived(data)
  }

  const getAmountSent = async (inputAddress: String) => {
    const response = await fetch('/api/getAmountSent', {
      method: 'POST',
      body: JSON.stringify({ address: inputAddress }),
    })

    const data = await response.json()
    if (data.error) {
      setError('Error : ' + data.error)
      return
    }

    setAmountSent(data)
  }

  const getUnspentOutputs = async (inputAddress: String) => {
    const response = await fetch('/api/getUnspentOutputsAddress', {
      method: 'POST',
      body: JSON.stringify({ address: inputAddress }),
    })

    const data = await response.json()
    if (data.error) {
      setError('Error : ' + data.error)
      return
    }

    setUnspentOutputs(data)
  }

  const getTransactions = async (inputAddress: String) => {
    const response = await fetch('/api/getTransactions', {
      method: 'POST',
      body: JSON.stringify({ address: inputAddress }),
    })

    const data = await response.json()
    if (data.error) {
      setError('Error : ' + data.error)
      return
    }

    setTransactions(data)
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-6/12 gap-4">
        <p className="text-xl">Enter your doge address</p>
        <input
          type="text"
          placeholder="0x..."
          className="input input-bordered w-full"
          onChange={handleInputChange}
        />
        <button
          className="btn"
          disabled={!inputValue.trim()} // Désactiver le bouton si l'input est vide
          onClick={
            async () => {
              reset()

              const arrayPromise = [
                getBalance(inputValue),
                getAmountReceived(inputValue),
                getAmountSent(inputValue),
                getUnspentOutputs(inputValue),
                getTransactions(inputValue)
              ]

              await Promise.all(arrayPromise).then(() => {
                setLoading(false)
              })
            }}
        >
          Submit
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </button>
        {resultBalance.balance === '' && error !== '' && <p className="text-red-600 bg-slate-100 p-3 rounded">{error}</p>}
        {/* If balance isn't undefined, display this */}
        {resultBalance.balance !== '' && resultBalance.success && (
          <div className="border bg-slate-100 p-3 rounded">
            <p> Balance : {resultBalance.balance}</p>
            <p> Confirmed : {resultBalance.confirmed}</p>
            <p> Unconfirmed : {resultBalance.unconfirmed}</p>
          </div>
        )}
        {resultAmountReceived.received !== '' && resultAmountReceived.success && (
          <div className="bg-slate-100 p-3 rounded">
            <p> Received : {parseFloat(resultAmountReceived.received).toFixed(2)} DOGE</p>
          </div>
        )}
        {resultAmountSent.sent !== '' && resultAmountSent.success && (
          <div className="bg-slate-100 p-3 rounded">
            <p> Sent : {parseFloat(resultAmountSent.sent).toFixed(2)} DOGE</p>
          </div>
        )}
        {resultUnspentOutputs.success && (
          <div className="bg-slate-100 p-3 rounded">
            <p> Unspent Outputs : {resultUnspentOutputs.unspent_outputs.length}</p>
            {resultUnspentOutputs.unspent_outputs.map((unspentOutput: UnspentOutputAtomical, index: number) => {
              return (
                <div key={index} className="flex flex-col gap-2 bg-slate-200 px-4 p-2">
                  <p>tx_hash : {unspentOutput.tx_hash}</p>
                  <p>tx_output_n : {unspentOutput.tx_output_n}</p>
                  <p>script : {unspentOutput.script}</p>
                  <p>address : {unspentOutput.address}</p>
                  <p>value : {unspentOutput.value}</p>
                  <p>confirmations : {unspentOutput.confirmations}</p>
                  <p>tx_hex : {unspentOutput.tx_hex}</p>
                </div>
              )
            })}
          </div>
        )}
        {resultTransactions.success && (
          <div className="bg-slate-100 p-3 rounded">
            <p> Transactions : {resultTransactions.transactions.length}</p>
            {resultTransactions.transactions.map((transaction: Transaction, index: number) => {
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
        )}
      </div>
    </main>
  )
}
