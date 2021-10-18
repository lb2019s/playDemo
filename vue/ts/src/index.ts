const msg = 'Typescript'

function sayHello(msg: string) {
    return 'hello ' + msg
}

document.body.textContent = sayHello(msg)

interface Square {
    kind: 'square';
    size: number;
}

interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}

// 有人仅仅是添加了 `Circle` 类型
// 我们可能希望 TypeScript 能在任何被需要的地方抛出错误
interface Circle {
    kind: 'circle';
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
    if (s.kind === 'square') {
      return s.size * s.size;
    } else if (s.kind === 'rectangle') {
      return s.width * s.height;
    } else if (s.kind === 'circle') {
      return s.radius * s.radius
    } else {
        return s
    }
  }

area({
    kind: 'circle',
    radius: 4
})

let foo = 'Hello World';

// 使用一个捕获的类型
let bar: typeof foo;

// bar 仅能被赋值 'Hello World'
bar = 'Hello World'; // ok
bar = 'anything else'; // Error

const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: typeof numLivesForCat,
}

// Error
// kitty = {
//     name: "Danielle",
//     numLives: typeof numLivesForCat
// };

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives += 'DDDDD'

const str = 'foo'

function hello(foo: typeof str):'foo' {
    return foo
}

hello('foo')