var all = require('promise-sequential')



var promiseAllArray =  (arr,fn,completeFn,errFn)=>{
    // if(!Type.isArray(arr)){
    //     arr = [arr]
    // }
    var pArray = new Array()
    arr.forEach(element => {
        pArray.push(fn(element))
    });
    Promise.all(pArray).then(values=>{
        completeFn(values)
    }).catch(errFn)
 }

 var promiseAllArraySerial =  (arr,fn,completeFn,errFn)=>{
    // if(!Type.isArray(arr)){
    //     arr = [arr]
    // }
    var pArray = new Array()
    arr.forEach(element => {
        pArray.push(()=>{ return new Promise((r,j)=>{  r(fn(element)) })})
    })

    all(pArray).then(values=>{
        completeFn(values)
    }).catch(errFn)
 }



//  promiseAllArray([5,4,3,2,1],function(d){
//      return new Promise((r,j)=>{
       
//         setTimeout(() => {
//             console.log("hello " + d)
//             r(d*10)
//         }, d*100);
//      })
//  },results=>{
//      console.log(results)
//  })


 promiseAllArraySerial([5,4,3,2,1],function(d){
    return new Promise((r,j)=>{
      
       setTimeout(() => {
           console.log("hello " + d)
           r(d*10)
       }, d*100);
    })
},results=>{
    console.log(results)
})



promiseAllArraySerial([5,4,3,2,1],function(d){
    console.log("hello " + d)
    return d
},results=>{
    console.log(results)
})