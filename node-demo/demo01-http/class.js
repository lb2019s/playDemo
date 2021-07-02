class Base {
    constructor(name) {
        this.init()
        this.name = name
    }

    init() {
        console.log('a')
    }

    sayHi() {
        Base._config = {'api': '123'}
        console.log(Base)
        console.log('c')
        console.log(this)
    }
    $xhr() {
        this.$ajax()
    }
    $ajax() {
        console.log(Base._config)
        console.log(this._config)
        console.log(this)
        console.log(this.constructor.__proto__._config)
        console.log(this.constructor._config)
        console.dir(Base)
        console.log(Base.constructor._config)
    }
    static count() {
        console.log('@')
    }
}

class Batch extends Base {
    init() {
        console.log('b')
        this.sayHi()
    }
}

const batch = new Batch()
batch.$xhr()