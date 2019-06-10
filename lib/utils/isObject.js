module.exports = function isObject(value) {
  return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
