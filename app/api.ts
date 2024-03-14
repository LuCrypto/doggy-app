// API calls
export const getBalance = async (inputAddress: String, setError: any, setBalance: any) => {
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

export const getAmountReceived = async (inputAddress: String, setError: any, setAmountReceived: any) => {
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

export const getAmountSent = async (inputAddress: String, setError: any, setAmountSent: any) => {
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

export const getUnspentOutputs = async (inputAddress: String, setError: any, setUnspentOutputs: any) => {
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

export const getTransactions = async (inputAddress: String, setError: any, setTransactions: any) => {
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
