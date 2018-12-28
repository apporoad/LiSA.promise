# LiSA.Promise
mad promsie swapper

## just try it

### install 
```bash
npm install --save lisa.promise
```
easy use
```js
const LiSAP = require('lisa.promise')
//your action
var yourAction = name =>{
    console.log("hello  i am " + name )
    return name
    //promise is supported also
    return new Promise((r,j)=>{
        setTimeout(()=>{
            console.log('i am ' + name)
            r(name)
        },100)
    })
}
// here to set serial or parallel or mutli-line
LiSA.queue(2)
LiSA.parallel()
LiSA.serial(2)

// your params
var names = ["LiSA" , null,"aoer" , "luna", "apporoad","rue","aphyse"]

// assign task
LiSAP.assignBatch(yourAction,names)

// action
LiSAP.action('default picar').then(names =>{
    console.log(names)
})

/* result:
hello  i am LiSA
hello  i am default picar
hello  i am aoer
hello  i am luna
hello  i am apporoad
hello  i am rue
hello  i am aphyse
[ 'LiSA',
  'default picar',
  'aoer',
  'luna',
  'apporoad',
  'rue',
  'aphyse' ]

*/

```
chain invoke 
```js
LiSAP
    .assignBatch(name=>{ console.log("hello  i am " + name ) ; return name},['LiSA','aoer'])
    .assignBatch(name=>{ console.log("hi i am " + name ) ; return name},['luna','apporoad'])
    .assignBatch(name=>{ return new Promise(r=> {console.log("hi i am promise " + name ) ; r(name) })},['luna','apporoad'])
    .assign(p=>{ console.log(' my name is ' + p) ; return p})
    .action('xxxxxx')
    .then(mina => {
        console.log(mina)
    })
    .catch(err =>{
        console.log(err)
    })
/*

hello  i am LiSA
hello  i am aoer
hi i am luna
hi i am apporoad
hi i am promise luna
hi i am promise apporoad
 my name is xxxxxx
[ 'LiSA', 'aoer', 'luna', 'apporoad', 'luna', 'apporoad', 'xxxxxx' ]
*/
```
more demo in testMad.js