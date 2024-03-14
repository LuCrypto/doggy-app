export interface Transaction {
  hash: string,
  confirmations: number,
  size: number,
  vsize: number,
  weight: any,
  version: number,
  locktime: number,
  block_hash: string,
  time: number,
  inputs_n: number,
  inputs_value: string,
  inputs: Input[],
  outputs_n: number,
  outputs_value: string,
  outputs: Output[],
  fee: string,
  price: string
}

export interface Input {
  pos: number,
  value: string,
  address: string,
  scriptSig: ScriptSig,
  previous_output: PreviousOutput
}

export interface ScriptSig {
  hex: string
}

export interface PreviousOutput {
  hash: string,
  pos: number
}

export interface Output {
  pos: number,
  value: string,
  type: string,
  address: string,
  script: Script,
  spent: Spent
}

export interface Script {
  hex: string,
  asm: string
}

export interface Spent {
  hash: string,
  pos: number
}
