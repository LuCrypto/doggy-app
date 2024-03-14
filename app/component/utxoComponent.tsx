import { UnspentOutputs, UnspentOutputAtomical } from "@/interfaces/interface-dogeapi";

export default function UnspendOutputComponent({ unspent_outputs, success }: UnspentOutputs) {
  if (success) {
    return (
      <div className="w-6/12 bg-slate-100 p-3 rounded">
        <p> Unspent Outputs : {unspent_outputs.length}</p>
        {unspent_outputs.map((unspentOutput: UnspentOutputAtomical, index: number) => {
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

          );
        })}
      </div>
    );
  }

  return null;
}

