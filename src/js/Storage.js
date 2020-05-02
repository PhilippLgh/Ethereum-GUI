import * as idb from 'idb'

export const getObjectStore = async (storeName, networkId = '1', dbName = 'ethui-db', version = 1) => {
  dbName = `${dbName}_${networkId}`
  const db = await idb.openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction) {
      console.log('upgrade called')
      const store = db.createObjectStore('transactions')
    }
  })
  console.log('db ready', db)
  return {
    put: async (key, val) => {
      const tx = db.transaction(storeName, 'readwrite')
      const store = await tx.objectStore(storeName)
      const value = await store.put(val, key)
      await tx.done
      return value
    },
    get: async (key) => {
      const tx = db.transaction(storeName, 'readwrite')
      const store = await tx.objectStore(storeName)
      return store.get(key)
    }
  }
}

export default class Storage {
  static instance;
  cache = {}
  constructor() {
    this.indexedDB = window.indexedDB
  }
  _makeKey(data) {
    // var crypto = require('crypto');
    // return crypto.createHash('md5').update(data).digest("hex");
    // console.log('key', data)
    return data.length
  }
  async put(key, value){
    const _key = this._makeKey(key)
    // console.log('store key', _key)
    this.cache[_key] = value
  }
  async get(key) {
    const _key = this._makeKey(key)
    // console.log('get key', _key)
    return this.cache[_key]
  }
}