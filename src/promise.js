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
        this.state = 'rejected'
        this.value = error
        this.callbacks.forEach(cb => this.handler(cb))
    }
    then(onFulfilled, onRejected){
        return new Promise((resolve, reject) => {
            if(this.state === 'pending'){
                this.callbacks.push({
                    onRejected,
                    onFulfilled,
                    resolve,
                    reject
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
        let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
        if(!cb){
            cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
            cb(this.value)
            return
        }
        let ret
        try{
            ret = cb(this.value);
            cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;

        }catch(error){
            ret = error
            cb = callback.reject
        }finally {
            cb(ret);
        }

    }
    catch(onError){
        return this.then(null, onError)
    }
    finally(onDone) {
        if (typeof onDone !== 'function') return this.then();
        let Promise = this.constructor;
        return this.then(
            value => Promise.resolve(onDone()).then(() => value),
            reason => Promise.resolve(onDone()).then(() => { throw reason })
        );
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