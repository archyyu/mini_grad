class Value {
    constructor(data, _children = [], _op = '') {
        this.data = data;
        this.grad = 0;
        this._backward = () => {};
        this._prev = new Set(_children);
        this._op = _op;
    }

    add(other) {
        other = other instanceof Value ? other : new Value(other);
        const out = new Value(this.data + other.data, [this, other], '+');

        out._backward = () => {
            this.grad += out.grad;
            other.grad += out.grad;
        };

        return out;
    }

    mul(other) {
        const out = new Value(this.data * other.data, [this, other], '*');

        out._backward = () => {
            this.grad += other.data * out.grad;
            other.grad += this.data * out.grad;
        };

        return out;
    }

    pow(other) {
        if (typeof other !== 'number') {
            throw new Error('only supporting int/float powers for now');
        }
        const out = new Value(Math.pow(this.data, other), [this], `**${other}`);

        out._backward = () => {
            this.grad += (other * Math.pow(this.data, other - 1)) * out.grad;
        };

        return out;
    }

    tanh() {
        const x = this.data;
        const t = (Math.exp(2 * x) - 1) / (Math.exp(2 * x) + 1);
        const out = new Value(t, [this], 'tanh');

        out._backward = () => {
            this.grad += (1 - t ** 2) * out.grad;
        };

        return out;
    }

    backward() {
        const topo = [];
        const visited = new Set();

        const buildTopo = (v) => {
            if (!visited.has(v)) {
                visited.add(v);
                for (const child of v._prev) {
                    buildTopo(child);
                }
                topo.push(v);
            }
        };

        buildTopo(this);

        this.grad = 1;
        for (let i = topo.length - 1; i >= 0; i--) {
            topo[i]._backward();
        }
    }

    neg() {
        return this.mul(new Value(-1));
    }

    radd(other) {
        return this.add(other);
    }

    sub(other) {
        return this.add(other.neg());
    }

    rsub(other) {
        return other.add(this.neg());
    }

    rmul(other) {
        return this.mul(other);
    }

    truediv(other) {
        return this.mul(other.pow(-1));
    }

    rtruediv(other) {
        return other.mul(this.pow(-1));
    }

    toString() {
        return `Value(data=${this.data}, grad=${this.grad})`;
    }
}
