/*const timer = function (time, cb ) {

 let [_yes, _no] = [null, null];

 setTimeout(() => (typeof cb === 'function' ? cb() : _yes('here ')), time || 2000)

 return new Promise((yes, no) => {
     _yes = yes
     _no = no
 })
}


timer(2000).then(data => console.log('then => ', data))
timer(3000, () => console.log('callback is done ')  )

const composeWithPromise = (f) => (...args) => new Promise ((yes, no) => { try {yes(f(...args))} catch(err) {no(err)}})

const myFunction = (str) => { console.log('runnig', str); var a = {}; a.t.toLocaleString() ;return 'the value'}

const myFunctionWithPromise = composeWithPromise(myFunction)

myFunctionWithPromise('test').then(data => console.log('data from promise is ', data)).catch(err => console.log('err => ' + err))



*/

const composeWithMemo = f => {
  const cache = {}
  return (x, y) => {
    const argsKey = `${x}_${y}`
    return cache[argsKey] ? cache[argsKey] : (cache[argsKey] = f(x, y))
  }
}

const foo = (x, y) => {
  console.log('running very long calculation of f(x,y)')
  return x + y
}

const bar = (x, y) => {
  console.log('running very very very long calculation of f(x,y)')
  return x * y
}

const [x, y] = [2, 4]
const fooWithMemo = composeWithMemo(foo)
const barWithMemo = composeWithMemo(bar)


console.log('res => ', fooWithMemo(x, y))
console.log('res => ', fooWithMemo(x, y))

console.log('res => ', barWithMemo(x, y))
console.log('res => ', barWithMemo(x, y))

// const myFunction = (str, cb) => {
//   console.log('function is running: ', str);
//   if typeof cb === 'function' ; return 'the result'
// }
//
// const composeWithPromise = (f) => (...args) => new Promise ((yes, no) => { try {yes(f(...args))} catch(err) {no(err)}})
// const myFunctionWithPromise = composeWithPromise(myFunction)
// myFunctionWithPromise('test')
// .then(res => console.log('data from promise is: ', res))
// .catch(err => console.log('err => ' + err))
// //
// //
// //
// // console.log('')
// // console.log('')
// // console.log('')
//
//
// timer = function(time, cb) {
//   let [_yes, _no] = [null, null]
//   setTimeout(() => (typeof cb === 'function' ? cb() : _yes('value')), time || 2000 )
//   return new Promise((yes, no) => {
//     _yes = yes
//     _no = no
//   })
// }

const myFunction = (str, cb) => {
  console.log('function is running: ', str)
  const res = `result of ${str}`
  var a = {};  a.t.toLocaleString()
  if (typeof cb === 'function') cb(res)
  return res
}

const composeWithPromise = f => (...args) => {
  let [_yes, _no, _res, _err, _cb] = [null, null, null, null]
  const promise = new Promise((yes, no) => {
    [_yes, _no] = [yes, no]
  })

  try {
    _res = f(...args)
  } catch (err) {
    _err = err
  }

  _cb = args.pop()
  _err ? _no(_err) : _yes(_res)

  return  _cb === 'function' ? _cb(_res) : promise
}

const myFunctionWithPromise = composeWithPromise(myFunction)

// running with callback
myFunctionWithPromise('test', data => console.log('callback:', data))

// running with promise
myFunctionWithPromise('test')
  .then(data => console.log('promise:', data))
  .catch(err => console.log('promise err => ', err))
