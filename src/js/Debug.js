export const spy = (obj, methods) => {
  let interceptedMethods = typeof methods === 'function' ? ['*'] : Object.keys(methods)
  return new Proxy(obj, {
    get(target, propKey) {
      const origMethod = target[propKey];
      const spyAll = interceptedMethods.includes('*')
      if (typeof origMethod !== 'function') {
        return target[propKey]
      }
      if (!spyAll && !interceptedMethods.includes(propKey)) {
        return target[propKey]
      }
      return function (...args) {
        if (typeof methods === 'function') {
          methods(propKey, ...args)
        } else {
          methods[propKey](...args)
        }
        let result = origMethod.apply(this, args);
        return result;
      };
    }
  })
}