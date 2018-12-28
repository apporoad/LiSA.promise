var LiSA = require('./')

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