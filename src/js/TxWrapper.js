import * as ethutil from 'ethereumjs-util'
import { BN } from 'ethereumjs-util'

/**
 * provides interface to call vm.runTx
 */
export default class TxWrapper {
  constructor(txData, sender) {
    this.tx = txData
    this.sender = sender
    const fields = [
      {
        name: 'nonce',
        length: 32,
        allowLess: true,
        default: Buffer.from([]),
      },
      {
        name: 'gasPrice',
        length: 32,
        allowLess: true,
        default: Buffer.from([]),
      },
      {
        name: 'gasLimit',
        alias: 'gas',
        length: 32,
        allowLess: true,
        default: Buffer.from([]),
      },
      {
        name: 'to',
        allowZero: true,
        length: 20,
        default: Buffer.from([]),
      },
      {
        name: 'value',
        length: 32,
        allowLess: true,
        default: Buffer.from([]),
      },
      {
        name: 'data',
        alias: 'input',
        allowZero: true,
        default: Buffer.from([]),
      }
    ]
    ethutil.defineProperties(this, fields, txData)
  }
  /**
   * the minimum amount of gas the tx must have (DataFee + TxFee + Creation Fee)
   * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md
   */
  getBaseFee() {
    /**
    const fee = this.getDataFee().iaddn(this._common.param('gasPrices', 'tx'))
    if (this._common.gteHardfork('homestead') && this.toCreationAddress()) {
      fee.iaddn(this._common.param('gasPrices', 'txCreation'))
    }
    return fee
    */
    // FIXME calculate base fee
    return new BN('1') // gasLimit must be higher
  }
  getSenderAddress() {
    // getSenderAddress is where the signature check is performed
    // <- unsigned tx with hardcoded sender possible
    // return this.tx.getSenderAddress()
    return this.sender
  }
  getUpfrontCost() {
    return new BN(this.gasLimit).imul(new BN(this.gasPrice)).iadd(new BN(this.value))
  }
}