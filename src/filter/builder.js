
const Expr = require('./expression')

class Builder {

    constructor() {
        this.parts = []
    }

    eq(x, y) { return Expr.eq(x, y) }

    lt(x, y) { return Expr.lt(x, y) }

    lte(x, y) { return Expr.lte(x, y) }

    gt(x, y) { return Expr.gt(x, y) }

    gte(x, y) { return Expr.gte(x, y) }

    like(x, y) { return Expr.like(x, y) }

    and() { return new Expr.AndX(arguments).get() }

    or() { return new Expr.OrX(arguments).get() }

    not(x) { return `-${x}` }

    where() {

        if(!arguments.length) return this
        
        let predicates = []

        if ('string' === typeof arguments[0]) {
            predicates = [...arguments]        
        } else {
            predicates = arguments[0]
        }

        predicates.forEach(predicate => this.add(predicate))

        return this
    }

    add(part) {
        this.parts.push(part)
        return this
    }

    get() {
        return this.parts.join(' AND ')
    }
}

module.exports = Builder
