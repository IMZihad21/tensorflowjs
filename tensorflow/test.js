import * as tf from '@tensorflow/tfjs-node';

const model = await tf.loadLayersModel('file://./tensorflow/savedModels/testmodel/model.json');

model.compile({
    optimizer: tf.train.sgd(0.5),
    loss: tf.losses.meanSquaredError
})

const query = [ 1, 0 ];

const result = await model.predict(tf.tensor2d([ query ])).data();

console.log(Math.round(result[ 0 ]));