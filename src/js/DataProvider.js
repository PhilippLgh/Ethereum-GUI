import { getObjectStore } from './Storage'

export class DataProvider {
  constructor(provider) {
    this.provider = provider
  }
  getAllAddresses = async () => {
    const accounts = await this.provider.listAccounts()
    return [...accounts]
  }
  getBlocks = async (end, start=0) => {
    const blocks = []
    let i = Math.max(start, 0)
    while (i <= end) {
      const block = await this.provider.getBlock(i)
      blocks.push(block)
      i++
    }
    return blocks
  }
  getAllTransactionForBlock = async (block) => {
    if (!block) return []
    const { transactions: txHashes } = block
    const transactions = []
    for (const txHash of txHashes) {
      const transaction = await this.provider.getTransaction(txHash)
      transactions.push(transaction)
    }
    return transactions
  }
  getAllTransactions = async () => {
    const latestBlock = await this.provider.getBlockNumber()
    const blocks = await this.getBlocks(latestBlock)
    const transactions = []
    for (const block of blocks) {
      const tx = await this.getAllTransactionForBlock(block)
      transactions.push(...tx)
    }
    return transactions
  }
  getAllTxByContract = async (contractAddress, skipCache=false) => {
    const network = await this.provider.getNetwork()
    const supported_networks = ['homestead', 'kovan', 'ropsten', 'rinkeby', 'goerli']
    if (supported_networks.includes(network.name)) {
      const store = await getObjectStore('transactions', network.chainId)
      let contractTransactions = await store.get(contractAddress, network.chainId)
      // cache miss
      if (!contractTransactions || skipCache) {
        contractTransactions = await this.provider.getHistory(contractAddress)
        await store.put(contractAddress, contractTransactions)
      }
      return contractTransactions || []
    } else {
      const allTx = await this.getAllTransactions()
      const contractTx = allTx.filter(tx => tx.to === contractAddress || tx.creates === contractAddress)
      return contractTx
    }
  }
  getAllContracts = async () => {
    const transactions = await this.getAllTransactions()
    const contractCreations = transactions.filter(tx => tx.creates).map(tx => tx.hash)
    const receipts = []
    for (const txHash of contractCreations) {
      const receipt = await this.provider.getTransactionReceipt(txHash)
      receipts.push(receipt)
    }
    return receipts
  }
}

export const getDataProvider = provider => new DataProvider(provider)