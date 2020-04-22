import TxWrapper from "../TxWrapper"
import Account from "ethereumjs-account"
import VM from "ethereumjs-vm"
import * as ethutil from 'ethereumjs-util'

const to32Bytes = (num) => {
  let numStr = num.toString()
  // const key =  Buffer.from('0000000000000000000000000000000000000000000000000000000000000001', 'hex')
  return Buffer.from(`${'0'.repeat(64 - numStr.length)}${numStr}`, 'hex')
}

export default class EthStateMachine {
  setAccount = async (vm, address, nonce) => {
    try {
      // https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/account/src/index.ts#L31
      // fund account with balance in wei and set nonce to correct tx nonce
      await vm.putAccount(address, new Account({ balance: 100e18, nonce }))
      const result = await vm.getAccount(address)
      // console.log('account set', address, result)
    } catch (error) {
      console.log('error funding address', error)
    }
  }
  runTx = async (vm, tx) => {
    // convert ethers bn to string values to be parsed by BN
    const txData = {
      value: tx.value._hex,
      gasLimit: tx.gasLimit._hex, // We assume that 2M is enough,
      gasPrice: tx.gasPrice._hex,
      data: tx.data,
      nonce: tx.nonce,
      to: tx.to
    }
    // const parsed = tryParseTransaction(tx)
    // console.log('process', parsed.name)
    // console.log('set tx.from', tx.from)
    tx = new TxWrapper(txData, tx.from)
    // https://github.com/ethereumjs/ethereumjs-vm/blob/e2c191b1c93e71f832413bb904f4db521208ebac/packages/vm/lib/runTx.ts#L89
    const result = await vm.runTx({ tx })
    return result
  }
  runTxSafe = async (vm, tx) => {
    const { from: sender } = tx
    // make sure sender has funds to run tx
    await this.setAccount(vm, sender, tx.nonce)
    return this.runTx(vm, tx)
  }
  async replayContractTransactions(transactions = [], to, contractAddressOriginal) {

    const storage = {}

    if (!transactions || transactions.length === 0) {
      return { createdAddress: undefined, storage }
    }

    const vm = new VM()
    vm.putAccount = vm.pStateManager.putAccount.bind(vm.stateManager)
    vm.getAccount = vm.pStateManager.getAccount.bind(vm.stateManager)

    const opcodes = []
    let contractAddress

    const opcodeListener = (event) => {
      // https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/vm/lib/evm/interpreter.ts#L179
      let { opcode, address } = event
      const { fee, name } = opcode
      const stack = [...event.stack]
      const copy = { ...event, stack }
      if (name === "SSTORE") {
        const [key, value] = stack.splice(-2).reverse()
        storage[key] = value.toString('hex')
        // console.log('store detected', address.toString('hex'), key.toString('hex'), value.toString('hex'))
      }
      opcodes.push(opcode)
    }

    // process all transactions...
    // this will set contractAddress and intercept calls to storage
    for (const tx of transactions) {
      // console.log('process tx', tx.hash)

      vm.on('step', opcodeListener)
      const result = await this.runTxSafe(vm, tx)
      vm.off('step', opcodeListener)

      const { execResult, gasUsedTotal, createdAddress } = result

      if (createdAddress) {
        // TODO provide network id
        contractAddress = ethutil.toChecksumAddress('0x' + createdAddress.toString('hex'))
      }

      // if we end up having a wrong contract address replicating the state failed
      if (createdAddress && contractAddressOriginal && contractAddress !== contractAddressOriginal) {
        throw new Error(`Contract address mismatch: ${contractAddress} !== ${contractAddressOriginal}`)
      }

      const { gasUsed /* BN */, gasRefund /* BN */, exceptionError, logs /* [] */, returnValue /* Buffer */ } = execResult
      const { error, errorType } = (exceptionError || {})
      // console.log(`gasUsed: ${gasUsed} opcodes: ${opcodes.length}, gasRefund: ${gasRefund} exceptionError: ${error} created: ${createdAddress ? createdAddress.toString('hex') : ''}`)

      // TODO if valid tx fails in simulation throw
      if (exceptionError) {
        console.log('failed tx', parseInt(tx.gasLimit._hex), tx)
        console.error(error, exceptionError)
        // throw new Error(error)
      }

      if (to && tx.hash === to.hash) {
        break;
      }
    }

    // TODO do we have to wait for event emitter?


    // TODO turn results into receipts
    // https://github.com/ethereumjs/ethereumjs-vm/blob/master/packages/vm/lib/runBlock.ts#L224
    return {
      createdAddress: contractAddress,
      storage
    }

  }
}