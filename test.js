var LiSA = require('./')()

LiSA.queue(2)
LiSA.parallel()
LiSA.serial(2)

LiSA.assignBatch(n=>{
    console.log('i am ' + n)
    return n*10
},[5,4,3,2,1]).action().then(ns =>{
    console.log(ns)
}).catch(rs=>{
    console.log(rs)
})



var LiSA1 = require('./')(1)

var LiSA2 = require('./')(2)


LiSA1.assignBatch(d=>{console.log('hello i LiSA1 ' +d )},['1','2','3'])

LiSA2.assignBatch(d=>{console.log('hello i LiSA2 ' +d )},['1','2','3'])

LiSA2.action().then()