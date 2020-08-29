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
