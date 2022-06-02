import * as tf from '@tensorflow/tfjs-node';

const model = await tf.loadLayersModel('file://./tensorflow/savedModels/testmodel/model.json');

model.compile({
    optimizer: tf.train.sgd(0.5),
    loss: tf.losses.meanSquaredError
})

const xorChecker = async query => {
    const result = await model.predict(tf.tensor2d([ query ])).data();
    return {
        value: Math.round(result[ 0 ]),
        accuracy: result[ 0 ]
    };
}

export default xorChecker;