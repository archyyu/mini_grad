class Layer {

    constructor(num, nin) {
        this.neurons = Array.from( {length: num}, () => new Neuron(nin));
    }

    parameters() {
        let ps = [];
        for(let item of this.neurons) {
            for(let n of item.parameters()) {
                ps.push(n);
            }
        }
        return ps;
    }

    forward(x) {
        let out = [];
        for(let item of this.neurons) {
            out.push(item.forward(x));
        }
        return out;
    }

}
