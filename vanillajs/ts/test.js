var Test;
(function (Test) {
    Test[Test["Color"] = 'w'] = "Color";
    Test[Test["age"] = 2] = "age";
    Test[Test["Name"] = 3] = "Name";
})(Test || (Test = {}));
console.log(Test['w']);
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
var watch;
setWatch();
console.log('' + watch);
function setWatch() {
    watch = 7;
}
