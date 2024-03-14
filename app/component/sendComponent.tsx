import { Sent } from "@/interfaces/interface-global-dogeapi";

export default function SentComponent({ sent, success }: Sent) {
  if (sent !== '' && success) {
    return (
      <div className="w-6/12 bg-slate-100 p-3 rounded">
        <p> Sent : {parseFloat(sent).toFixed(2)} DOGE</p>
      </div>
    );
  }

  return null;
}
