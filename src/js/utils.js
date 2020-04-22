import { ethers } from "ethers"
import Storage from "./Storage"

export const parseTransaction = (abi, tx) => {
  // TODO memoize
  const _interface = new ethers.utils.Interface(abi)
  const parsed = _interface.parseTransaction(tx)
  return parsed
}

export const tryParseTransaction = (tx, abi) => {
  // TODO try to do abi or hash lookup by tx.data, tx address or bytecode
  // TODO is bug? parsed constructor = null
  const parsed = parseTransaction(abi, tx)
  return parsed ? parsed : {
    name: 'constructor'
  }
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


export const getCompilerData = async (bytecode) => {
  const storage = await Storage.getInstance()
  return undefined
  // return storage.get(bytecode)
}