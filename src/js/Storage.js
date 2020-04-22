export default class Storage {
  static instance;
  cache = {}
  constructor() {
    this.indexedDB = window.indexedDB
  }
  static async getInstance() {
    if(!Storage.instance) {
      Storage.instance = new Storage()
      // await Storage.instance.open()
    }
    return Storage.instance
  }
  async open() { 
    const dbVersion = 1;
    const request = indexedDB.open("ethGUI", dbVersion);
    return this.waitRequest(request)
  }
  waitRequest(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = function (event) {
        console.log('storage opened')
        resolve(event)
      }
    })
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