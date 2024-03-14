import { Sent } from "@/interfaces/interface-dogeapi";

export default function SentComponent({ sent, success }: Sent) {
  if (sent !== '' && success) {
    return (
      <div className="bg-slate-100 p-3 rounded">
        <p> Sent : {parseFloat(sent).toFixed(2)} DOGE</p>
      </div>
    );
  }

  return null;
}
