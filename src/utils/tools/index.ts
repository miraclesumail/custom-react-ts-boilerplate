export function memorize(fn) {
  const resultMap = new Map();
  return (...args) => {
    if (resultMap.has(args)) {
      return resultMap.get(args);
    }
    const result = fn.apply(null, args);
    resultMap.set(args, result);
    return result;
  };
}

export function isEqual(obj1, obj2) {
  const type1 = Object.prototype.toString.call(obj1);
  const type2 = Object.prototype.toString.call(obj2);

  if (type1 !== type2) {
    return false;
  }

  if (!obj1 && !obj2) {
    return true;
  }

  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

