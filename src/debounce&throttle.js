function debounce(fn, wait, immediate){
    let timer = null
    return function(){
        const args = arguments
        timer && clearTimeout(timer)
        if(immediate && !timer){
            fn.apply(this, args)
            timer = setTimeout(() => {
                timer = null
            }, wait)
        }else{
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
    }
}

function throttle(fn, wait){
    let prev = 0
    return function(){
        let now = Date.now()
        if(now - prev > wait){

        }
    }
}