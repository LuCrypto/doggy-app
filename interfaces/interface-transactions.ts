export interface TransactionFromAddress {
  hash: string,
  value: string,
  time: number,
  block: number,
  price: string
}

export interface Transactions {
  transactions: TransactionFromAddress[],
  success: number
}
