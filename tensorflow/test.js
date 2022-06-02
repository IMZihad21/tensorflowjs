import tf from '@tensorflow/tfjs-node';
import fs from 'fs';

(async function () {
    let model;
    // load saved model file if exist
    if (fs.existsSync('./tensorflow/savedModel/model.json')) {
        model = await tf.loadLayersModel('file://./tensorflow/savedModel/model.json')
    }
    else {
        model = tf.sequential();
        model.add(tf.layers.dense({
            inputShape: [ 2 ],
            units: 5,
            activation: 'sigmoid'
        }))

        model.add(tf.layers.dense({
            units: 1,
            activation: 'sigmoid'
        }))

    }

    const compileConfig = {
        loss: 'meanSquaredError',
        optimizer: 'sgd',
        metrics: [ 'accuracy' ]
    }

    model.compile(compileConfig)

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
            shuffle: true,  // shuffle the training data
            epochs: 10,     // train the model 10 times
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

    for (let i = 0; i < 100; i++) {
        await train()
    }
    await model.save('file://./tensorflow/savedModel')
    console.log(`0,0: ${await predict([ 0, 0 ])}`)
    console.log(`0,1: ${await predict([ 0, 1 ])}`)
    console.log(`1,0: ${await predict([ 1, 0 ])}`)
    console.log(`1,1: ${await predict([ 1, 1 ])}`)
})();