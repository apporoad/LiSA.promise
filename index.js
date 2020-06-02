const all = require('promise-sequential')

 var parallelRun = (assignArr,defaultParam)=>{
     var pArray = new Array()
     assignArr.forEach(element=>{
        pArray.push( new Promise((r,j)=>{  r(element.action(element.param || defaultParam)) }))
     })
     return Promise.all(pArray)
 }


 var serialRun = (assignArr,defaultParam)=>{
    var pArray = new Array()
    assignArr.forEach(element => {
        pArray.push(()=>{ return new Promise((r,j)=>{  r(element.action(element.param || defaultParam)) })})
    })
    return all(pArray)
 }

function LiSA(qcount){
    var _this =this
    this._queue =qcount || 0
    this._todoList= new Array()

    this.queue = count =>{
        _this._queue = count || 0
        return _this
    }
    this.serial = count=>{
        _this._queue = count || 1
        return _this
    }
    this.parallel = ()=>{
        _this._queue = 0
        return _this
    }
    this.assignBatch = (action,paramArray)=>{
        if(!paramArray) return new Promise((r,j)=>{r(null)})
        if(Object.prototype.toString.call(paramArray) != '[object Array]'){
            paramArray = [paramArray]
        }
        paramArray.forEach(p=>{
            _this._todoList.push({
                action : action,
                param : p
            })
        })
        _triggerAuto()
        return _this
    }
    
    this.assign = (action , param) =>{
        _this._todoList.push({
            action : action,
            param : param
        })
        _triggerAuto()
        return _this
    }

    var _atcion = defaultParam =>{
        if(_this._todoList.length == 0) return new Promise((r,j)=>{r()})
        var todoList = []
        Object.assign(todoList,_this._todoList)
        //clear
        _this._todoList=[]
        if(_this._queue <=0){
            return parallelRun(todoList,defaultParam)
        }
        if(_this._queue ==1){
            return serialRun(todoList,defaultParam)
        }
        // here queue to run
        var d2Array = new Array()
        var queueLength = _this._queue
        for(var i =0 ;i<todoList.length;i++){
            var queueIndex= i % queueLength
            if(d2Array.length < queueIndex +1){
                d2Array.push(new Array())
            }
            d2Array[queueIndex].push(todoList[i])
        }
        var pTodoList =Array()
        d2Array.forEach(tds =>{
            pTodoList.push({
                action  :tds=>{
                    return serialRun(tds,defaultParam)
                },
                param : tds
            })
        })
        return parallelRun(pTodoList).then(d2a =>{
            // [ [ 50, 30, 10 ], [ 40, 20 ] ]
            var qlength = d2a.length
            var fArray = new Array()
            for(var i=0;;i++){
                var qIndex = i % qlength
                var qDeep = Math.floor(i / qlength)
                if(d2a[qIndex].length <= qDeep)
                    break
                fArray.push(d2a[qIndex][qDeep])
            }
            return new Promise(r=>{ r(fArray)})
        })
    }
    this.action = defaultParam =>{
        if(_autoOptions.on){
            console.log("LiSA.promis : autoAction on , do nothing here")
            return
        }
        return _atcion(defaultParam)
    }

    var _autoOptions = {
        on : false,
        then : (()=>{}),
        catch : (()=>{}),
        internal : 100,
        defaultParam: null,
        running : false
    }
    var _triggerAuto =()=>{
        if(_autoOptions.on){
            if(_autoOptions.running ==false){
                _auto()
            }
        }
    }
    var _auto = ()=>{
        var lock = false
        var ti = setInterval(() => {
            if(_autoOptions.on){
                _autoOptions.running =true
                if(!lock){
                    // no tasks
                    if(_this._todoList.length == 0){
                        //没有任务，自动停止执行
                        clearInterval(ti)
                        //再次触发时起效果
                        _autoOptions.running =false
                        return
                    }
                    lock = true
                    _atcion(_autoOptions.defaultParam).then(windowMina=>{
                        if(_autoOptions.then){
                            var r =  _autoOptions.then(windowMina)
                            if(r && r.then){
                                r.then(()=>{ 
                                    lock = false
                                })
                            }
                            else
                            {
                                lock = false
                            }
                        }
                        else
                        {
                            lock =false
                        }
                    }).catch(_atcion.catch)
                }
               
            }
            else{
                clearInterval(ti)
                _autoOptions.running =false
            }
        }, _autoOptions.internal)
    }
    this.autoAction = (defaultParam,options) =>{
        if(options){
            _autoOptions.then = options.then || _autoOptions.then
            _autoOptions.catch = options.catch || _autoOptions.catch
            _autoOptions.internal = options.internal  || options.interval || _autoOptions.internal 
        }
        _autoOptions.defaultParam = defaultParam
        if(_autoOptions.on ==false){
            _autoOptions.on = true
            _triggerAuto()
            //_auto()
        }
    }
    this.stopAuto = ()=>{
        _autoOptions.on = false
    }
    

}

module.exports =(queue)=>{
    return new LiSA(queue)
}