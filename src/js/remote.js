// TODO replace with remote: https://github.com/philipplgh/remote
export const remote = (worker) => {
  let id = 0
  return new Proxy({}, {
    get(target, prop) {
      return (...args) => new Promise((resolve, reject) => {
        const requestId = id
        worker.postMessage({
          id: id++,
          method: prop,
          arguments: [...args]
        })
        let responseHandler = function (event) {
          const { data } = event
          const { result, id: responseId, error } = data
          if (requestId === responseId) {
            worker.removeEventListener('message', this)
            if (error) {
              return reject(error)
            }
            resolve(result)
          }
        }
        worker.addEventListener('message', responseHandler)
      })
    }
  })
}