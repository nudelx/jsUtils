const add = x =>  x + 1
const sub = x =>  x - 1
const mul2 = x =>  x * 2
const pow2 = x =>  x ** 2

const pipe = (f,g) => (...args) => g(f(...args))
const t1 = pipe(add, mul2)

t1(2)

const pipeAll = (...fns) => fns.reduce(pipe)
const testAll = pipeAll(add, sub, mul2, pow2)
testAll(2)

