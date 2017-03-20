var memo = {
  register: function (f) {
    var cache = {};
    return function (x) {
      return cache[x] ? cache[x] : cache[x] = f(x)
    }
  } 
}
module.exports = memo
