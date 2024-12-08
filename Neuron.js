class Neuron {
    constructor(nin) {
        this.w = Array.from({ length: nin }, () => new Value(Math.random() * 2 - 1)); // Initialize weights
        this.b = new Value(Math.random() * 2 - 1); // Initialize bias
    }

    parameters() {
        return [...this.w, this.b];
    }

    forward(x) {
        // Compute the weighted sum plus bias
        let act = this.w.reduce((acc, w, i) => acc.add(w.mul(x[i])), this.b);
        // Apply the ReLU activation function
        return act.relu();
    }
}
