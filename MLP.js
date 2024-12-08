class MLP {

    constructor() {
        this.lay1 = new Layer(2, 2);
        this.neu1 = new Neuron(1, 2);
    }

    forward(x) {
        let out1 = this.lay1.forward(x);
        return this.neu1.forward(out1);
    }

    parameters() {
        let ps = [];
        for(let item of this.lay1.parameters()) {
            ps.push(item);
        }
        for(let item of this.neu1.parameters()) {
            ps.push(item);
        }
        return ps;
    }

}
