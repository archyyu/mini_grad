class Linear {
    
    constructor(in_features, out_features) {
        this.in_features = in_features;
        this.out_features = out_features;
        this.w = new Array(in_features);
        for(let i=0;i<in_features;i++) {
            this.w[i] = new Array(out_features);
            for(let j=0;j<out_features;j++) {
                this.w[i][j] = new Value(Math.random() * 2 - 1);
            }
        }
    }
    
    forward(x) {
        let output = [];
        for(let i=0;i<x.length;i++) {
            let newRow = [];
            for(let j=0;j<this.out_features;j++) {
                let item = new Value(0.0);
                for(let k=0;k<this.in_features;k++) {
                    item = item.add(x[i][k].mul(this.w[k][j]))
                }
                newRow.push(item);
                
            }
            output.push(newRow);
        }
        return output;
    } 
    
}
