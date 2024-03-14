export interface UnspentOutputAtomical {
  tx_hash: string,
  tx_output_n: number,
  script: string,
  address: string,
  value: number,
  confirmations: number,
  tx_hex: string
}

export interface UnspentOutputs {
  unspent_outputs: UnspentOutputAtomical[],
  success: number
}