import tf from '@tensorflow/tfjs-node';

const train_xs = tf.tensor2d([
    [ 0, 0 ],
    [ 0, 1 ],
    [ 1, 0 ],
    [ 1, 1 ]
])

const train_ys = tf.tensor2d([
    [ 0 ],
    [ 1 ],
    [ 1 ],
    [ 0 ]
])

const model = tf.sequential();
model.add(tf.layers.dense({
    inputShape: [ 2 ],
    units: 5,
    activation: 'sigmoid'
}))
model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
}))

const sgdOpt = tf.train.sgd(0.5);
const loss = tf.losses.meanSquaredError;

model.compile({
    optimizer: sgdOpt,
    loss
})

const config = {
    shuffle: true,
    epochs: 10,
    callbacks: {
        onEpochEnd: (epoch, logs) => {
            console.log(logs.loss);
        }
    }
}

const train = async () => {
    await model.fit(train_xs, train_ys, config)
}


const predict = async input => {
    const output = model.predict(tf.tensor2d([ input ]))
    return await output.data()
}

async function main() {
    for (let i = 0; i < 1000; i++) {
        await train()
    }
    console.log(`0,0: ${await predict([ 0, 0 ])}`)
    console.log(`0,1: ${await predict([ 0, 1 ])}`)
    console.log(`1,0: ${await predict([ 1, 0 ])}`)
    console.log(`1,1: ${await predict([ 1, 1 ])}`)
}

main();