import { ethers } from "ethers"

export const getBlocks = async (provider, end, start=0) => {
  const blocks = []
  let i = Math.max(start, 0)
  while (i <= end) {
    const block = await provider.getBlock(i)
    blocks.push(block)
    i++
  }
  return blocks
}

const getAllTransactionForBlock = async (provider, block) => {
  if (!block) return []
  const { transactions: txHashes } = block
  const transactions = []
  for (const txHash of txHashes) {
    const transaction = await provider.getTransaction(txHash)
    transactions.push(transaction)
  }
  return transactions
}

export const getAllTransactions = async (provider) => {
  const latestBlock = await provider.getBlockNumber()
  const blocks = await getBlocks(provider, latestBlock)
  const transactions = []
  for (const block of blocks) {
    const tx = await getAllTransactionForBlock(provider, block)
    transactions.push(...tx)
  }
  return transactions
}

export const getAllTxByContract = async (provider, contractAddress) => {
  const allTx = await getAllTransactions(provider)
  const contractTx = allTx.filter(tx => tx.to === contractAddress || tx.creates === contractAddress)
  return contractTx
}

export const getAllContracts = async (provider) => {
  const transactions = await getAllTransactions(provider)
  const contractCreations = transactions.filter(tx => tx.creates).map(tx => tx.hash)
  const receipts = []
  for (const txHash of contractCreations) {
    const receipt = await provider.getTransactionReceipt(txHash)
    receipts.push(receipt)
  }
  return receipts
}

export const getAllAddresses = async (provider) => {
  const accounts = await provider.listAccounts()
  return [...accounts]
}

export const createFundedTestAccount = async (provider) => {
  // https://github.com/paritytech/wiki/blob/master/JSONRPC-personal-module.md#personal_newaccount
  // it becomes the new current unlocked account. There can only be one unlocked account at a time.
  const password = ''
  const newAccount = await provider.send('personal_newAccount', [ password ])

  const accounts = await provider.listAccounts()
  const coinbase = await provider.getSigner(accounts[0]);
  const unlocked = await coinbase.unlock(password)
  if (!unlocked) {
    throw new Error('Could not unlock coinbase')
  }

  const amount = ethers.utils.parseEther('100.0');
  const txRaw = {
      to: newAccount,
      value: amount
  };

  const tx = await coinbase.sendTransaction(txRaw);
  return tx
}

const code = `
contract Storage {
  uint pos0;
  mapping(address => uint) pos1;
  
  function Storage() {
      pos0 = 1234;
      pos1[msg.sender] = 5678;
  }
}
`

export const getSourceCode = async (contractAddressOrFileName) => {
  return code
}