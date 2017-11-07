 const timer = function (time, cb ) {
 
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

const myFunction = (str) => { console.log('runnig', str); return 'the value'}

const myFunctionWithPromise = composeWithPromise(myFunction)

myFunctionWithPromise('test').then(data => console.log('data from promise is ', data))


