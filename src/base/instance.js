// A instanceof B
// 本质上是检查B的prototype是否在A的原型链上
function _instance(A, B){
    const C = B.prototype
    A = A.__proto__
    while(ture){
        if(A === null){
            return false
        }
        if(C === A){
            return true
        }
        A = A.__proto__
    }
}