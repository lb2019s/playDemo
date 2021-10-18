var msg = 'Typescript';
function sayHello(msg) {
    return 'hello ' + msg;
}
// document.body.textContent = sayHello(msg);
function area(s) {
    if (s.kind === 'square') {
        return s.size * s.size;
    }
    else if (s.kind === 'rectangle') {
        return s.width * s.height;
    }
    else if (s.kind === 'circle') {
        return s.radius * s.radius;
    }
    else {
        return s;
    }
}
area({
    kind: 'circle',
    radius: 4
});
var foo = 'Hello World';
// 使用一个捕获的类型
var bar;
// bar 仅能被赋值 'Hello World'
bar = 'Hello World'; // ok
bar = 'anything else'; // Error
var numLivesForCat = 9;
var kitty = {
    name: "Aurora",
    numLives: typeof numLivesForCat
};
// Error
// kitty = {
//     name: "Danielle",
//     numLives: typeof numLivesForCat
// };
// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
console.log(kitty.numLives);
