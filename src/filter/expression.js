
const OPERATORS = {
    eq: '=',
    like: ':',
    lt: '<',
    lte: '<=',
    gt: '>',
    gte: '>='
}

class Base {
    constructor(params) {

        const args = Array.from(params)
        
        this.separators = {
            pre: '(', 
            item: ',',
            post: ')'
        }

        this.parts = []
        
        this.addMultiple(args)
    }

    addMultiple(args) {

        if('string' === typeof args) {
            args = [args]
        }

        args.forEach(arg => {
            this.add(arg)
        })    
    }

    add(part) {
        this.parts.push(part)
        return this
    }

    count() {
        return this.parts.length
    }
    
    get() {
        if (this.count() === 1) {
            return this.parts[0]
        }

        return `${this.separators.pre}${this.parts.join(this.separators.item)}${this.separators.post}`
    }
}

class Compare {
    static from(left, operator, right) {
        const op = Object.values(OPERATORS)
        if(op.indexOf(operator) == -1) {
            throw new Error(`Unsuported operator [${operator}]. Allow ${op.join(',')}`)
        }
        return `${left}${operator}${right}`
    }

    static eq(x, y) { return Compare.from(x, OPERATORS.eq, y) }

    static like(x, y) { return Compare.from(x, OPERATORS.like, y) }

    static lt(x, y) { return Compare.from(x, OPERATORS.lt, y) }

    static lte(x, y) { return Compare.from(x, OPERATORS.lte, y) }

    static gt(x, y) { return Compare.from(x, OPERATORS.gt, y) }

    static gte(x, y) { return Compare.from(x, OPERATORS.gte, y) }
}

class AndX extends Base {
    constructor(args) {
        super(args)
        this.separators.item = ' AND '
    }
}

class OrX extends Base {
    constructor(args) {
        super(args)
        this.separators.item = ' OR '
    }
}

module.exports = {
    Compare,
    AndX,
    OrX,
    eq: Compare.eq,
    like: Compare.like,
    lt: Compare.lt,
    lte: Compare.lte,
    gt: Compare.gt,
    gte: Compare.gte
}
