'use strict'
/* eslint-disable */

import solc from 'solc/wrapper'

self.importScripts('https://solc-bin.ethereum.org/bin/list.js')


class Compiler {
  constructor() {
    this.id = Date.now()
  }
  async getVersions() {
    return Object.keys(self.soljsonReleases)
  }
  async compile(source) {
      self.Module = undefined
      const releases = self.soljsonReleases
      const version = '0.5.0' // 'soljson-latest'
      self.importScripts(`https://solc-bin.ethereum.org/bin/${releases[version]}`)
      const _solc = solc(self.Module)
      const sources = {
        'file.sol': { content: source }
      }
      const input = {
        language: 'Solidity',
        sources,
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };
      const output = JSON.parse(_solc.compile(JSON.stringify(input)));
      return output
  }
}

const compiler = new Compiler()

onmessage = async (event) => {
  const { data } = event
  const { id, method, arguments: args } = data
  if (typeof compiler[method] === 'function') {
    try {
      const result = await compiler[method](...args)
      postMessage({
        id,
        result
      })
    } catch (error) {
      postMessage({
        id,
        error
      })
    }
  }
}