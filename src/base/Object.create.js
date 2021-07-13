// const a = Object.create(b)
// 作用是将a.__proto__指向b
function create(obj){
    function F(){}
    F.prototype = obj
    return new F()
}