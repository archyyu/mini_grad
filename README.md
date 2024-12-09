Inspired by Andrej

let us create MLP, CNN and RNN from scratch by Javascript 


we could create a MLP to solve the problem of XOR
the input should be
x =    [[new Value(0), new Value(0)],
        [new Value(0), new Value(1)],
        [new Value(1), new Value(0)], 
        [new Value(1), new Value(1)]];

the corresponding output should be
y = [0, 1, 1, 0]

training process:
//train
for(let i=0;i<10000;i++) {

    let loss = new Value(0);
    for(let index in x) {
        let pred = mlp.forward(x[index]);
        let jjj = pred.sub(new Value(y[index]));
        let iii = jjj.pow(2);
        loss = loss.add(iii);
    }

    console.log(loss);

    for(let p of mlp.parameters()) {
        p.grad = 0;
    }
    loss.backward();

    for(let p of mlp.parameters()) {
        p.data += -0.01 * p.grad
    }
}

//verify
for (let item of x) {
    let p = mlp.forward(item);
    console.log(p)
}
