class Promise{
    callbacks = []
    state = 'pending'
    value = null
    constructor(exec){
        exec(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(data){
        if(data && (typeof data === 'object' || typeof data === 'function')){
            const then = data.then
            if(typeof then === 'function'){
                // 使用promise链中的promise上下文执行返回的promise对象的then方法，则会为promise链中的state、value赋值
                then.call(data, this.resolve.bind(this))
                return
            }
        }
        this.state = 'fulfilled'
        this.value = data
        this.callbacks.forEach(cb => this.handler(cb))
    }
    reject(error){
        this.state =

    }
    then(onFulfilled){
        return new Promise(resolve => {
            if(this.state === 'pending'){
                this.callbacks.push({
                    onFulfilled,
                    resolve
                })
            }else{
                this.handler({
                    onFulfilled,
                    resolve
                })
            }
        })
    }
    handler(callback){
        if(!callback.onFulfilled){
            callback.resolve(this.value)
        }else{
            callback.resolve(callback.onFulfilled(this.value))
        }
    }
}

const p = new Promise(function(resolve){
    resolve(1)
}).then(data => {
    return new Promise(function(resolve){
        resolve(2)
    })
})
p.then(data => {
    console.log(data);
})