export interface Balance {
  balance: string,
  confirmed: string,
  unconfirmed: string,
  success: number
}

export interface Received {
  received: string,
  success: number
}

export interface Sent {
  sent: string,
  success: number
}

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

export interface Transaction {
  hash: string,
  value: string,
  time: number,
  block: number,
  price: string
}

export interface Transactions {
  transactions: Transaction[],
  success: number
}
