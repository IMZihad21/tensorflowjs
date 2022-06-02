import tf from '@tensorflow/tfjs-node';
import fs from 'fs';

let model;
// load saved model file if exist
if (fs.existsSync('./tensorflow/savedModels/testmodel')) {
    model = await tf.loadLayersModel('file://./tensorflow/savedModels/testmodel/model.json')
}
else {
    model = tf.sequential({
        layers: [
            tf.layers.dense({
                inputShape: [ 2 ],
                units: 10,
                activation: 'sigmoid'
            }),
            tf.layers.dense({
                units: 1,
                activation: 'sigmoid'
            })
        ]
    })
}

model.compile({
    optimizer: tf.train.sgd(0.5),
    loss: tf.losses.meanSquaredError
})

const train = async () => {
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
    await model.fit(train_xs, train_ys, {
        shuffle: true,
        epochs: 10,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(logs.loss);
            }
        }
    })
}


const predict = async input => {
    const output = model.predict(tf.tensor2d([ input ]))
    return await output.data()
}

async function main() {
    for (let i = 0; i < 10000; i++) {
        await train()
    }
    await model.save('file://./tensorflow/savedModels/testmodel')
    console.log(`0,0: ${await predict([ 0, 0 ])}`)
    console.log(`0,1: ${await predict([ 0, 1 ])}`)
    console.log(`1,0: ${await predict([ 1, 0 ])}`)
    console.log(`1,1: ${await predict([ 1, 1 ])}`)
}

main();