const LiSAP = require('./')()

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

// your params
var names = ["LiSA" , null,"aoer" , "luna", "apporoad","rue","aphyse"]

// assign task
LiSAP.assignBatch(yourAction,names)

// action
LiSAP.action('default picar').then(names =>{
    console.log(names)
})



// chain

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