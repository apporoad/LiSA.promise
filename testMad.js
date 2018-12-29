var LiSA = require('./')()

var paramArray = new Array()
for(var i =0 ;i<101;i++){
    paramArray.push(101 -i)
}

LiSA.queue(10)

LiSA.assignBatch(n=>{
    return new Promise((r,j)=>{
        // if(n==50){
        //     j('some thing error')
        //     return
        // }
        setTimeout(()=>{
            console.log('i am ' + n)
            r(n*10)
        },10*n)
    })
   
},paramArray)

LiSA.assign(p=>{ console.log("hello " + p)})

LiSA.action('good day').then(ns =>{
    console.log(ns)
}).catch(rs=>{
    console.log(rs)
})