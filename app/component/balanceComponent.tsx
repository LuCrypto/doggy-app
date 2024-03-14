import { Balance } from "@/interfaces/interface-dogeapi";

export default function BalanceComponent({ balance, confirmed, unconfirmed, success }: Balance) {
  if (balance !== '' && success) {
    return (
      <div className="w-6/12 border bg-slate-100 p-3 rounded">
        <p>Balance: {balance}</p>
        <p className="text-sm px-2 text-gray-400">Confirmed: {confirmed}</p>
        <p className="text-sm px-2 text-gray-400">Unconfirmed: {unconfirmed}</p>
      </div>
    );
  }

  return null;
}