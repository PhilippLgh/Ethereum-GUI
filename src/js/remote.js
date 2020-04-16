// TODO replace with remote: https://github.com/philipplgh/remote
export const remote = (worker) => {
  let id = 0
  return new Proxy({}, {
    get(target, prop) {
      return () => new Promise((resolve, reject) => {
        const requestId = id
        worker.postMessage({
          id: id++,
          method: prop
        })
        let responseHandler = function (event) {
          const { data } = event
          const { result, id: responseId } = data
          if (requestId === responseId) {
            resolve(result)
            worker.removeEventListener('message', this)
          }
        }
        worker.addEventListener('message', responseHandler)
      })
    }
  })
}