var LiSA = require('./')()

LiSA.queue(2)

LiSA.autoAction("hello good day",{
    then : (mina) => {
        console.log( "mina are : " + mina) 
        return new Promise((r,j)=>{ setTimeout(()=>{ console.log("stoped then"); r()},2000) })}
})

LiSA.assignBatch(name=>{ console.log("hello  i am " + name ) ; return name},['1','2'])

var index =3
setInterval(()=>{
    LiSA.assign(name=>{ console.log("hello  i am " + name ) ; 
    return  new Promise((r,j)=>{  
        setTimeout(()=>{
            r(name)
        },Math.random()*1000)
    })
},index++)

},100)