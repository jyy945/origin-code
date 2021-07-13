function _new(Parent){
    let obj = {}
    obj.__proto__ = Parent.prototype
    Parent.call(obj)
    return obj
}
