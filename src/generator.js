function * gen(x){
    var a = yield x + 2;
    return a
}

var a = gen(1)
console.log(a.next(11));
console.log(a.next(11));