import { Received } from "@/interfaces/interface-dogeapi";

export default function ReceivedComponent({ received, success }: Received) {
  if (received !== '' && success) {
    return (
      <div className="bg-slate-100 p-3 rounded">
        <p> Received : {parseFloat(received).toFixed(2)} DOGE</p>
      </div>
    );
  }

  return null;

}