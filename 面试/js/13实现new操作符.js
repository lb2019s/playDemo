function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype)
    const res = fn.apply(obj, args)
    if (res && typeof res === 'object') {
        return res
    }
    return obj
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log(this.age);
};
let p1 = myNew(Person, "lihua", 18);
console.log(p1.name);
console.log(p1);
p1.say();
