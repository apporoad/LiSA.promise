declare class AutoOptions{

    /**
     * 阶段完成之后处理
     * (mina) => { return Promise.resolve(1) }
     */
    then : Function

    /**
     * 异常处理
     */
    catch : Function

    /**
     * 自动执行间隔 默认 100 (ms)
     */
     interval : Number
}
  /**
   * Promise 类
   */
  declare class LiSAPromise{
    
    /**
     * 排队执行任务
     * @param count 队列数， 默认为0 
     */
    queue(count ? : Number)  : LiSAPromise
    
    /**
     * 顺序执行，类似queue
     * @param count  队列数，默认 1
     */
    serial (count ? : Number) : LiSAPromise

    /**
     * 平行方式执行任务，完全并发
     */
    parallel(): LiSAPromise

    /**
     * 批量布置任务
     * @param action 执行操作
     * @param paramArray  参数数组 
     */
    assignBatch (action : Function,paramArray :Array) : LiSAPromise
    
    /**
     * 布置一个任务
     * @param action  执行操作
     * @param param  参数
     */
    assign (action : Function, param ? : any) : LiSAPromise
      
    /**
     * 执行所有任务
     * @param defaultParam 默认参数，当之前部署任务的参数为空时，采用默认参数
     */
     action (defaultParam  ?: any)  :  Promise

     /**
      * 自动执行布置的任务
      * @param defaultParam 默认参数，同action
      * @param options 扩展参数
      */
     autoAction (defaultParam ? : any,options ? : AutoOptions) 

     /**
      * stop 自动执行
      */
     stopAuto()
  }
  
  /**
   * 初始化一个Promise对象
   * @param queue 队列数 ， 默认 0
   */
  declare function LiSAPromise(queue ? : Number): LiSAPromise
  
  export = LiSAPromise
  