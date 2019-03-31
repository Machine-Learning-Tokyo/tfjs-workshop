import * as tf from '@tensorflow/tfjs';
import indices_char from './indices_char';
import char_indices from './char_indices';
import 'babel-polyfill';

const INPUT_LENGTH = 40;
const CHARS_TO_GENERATE = 200;

/**
 * Main application to start on window load
 */
class Main {
  /**
   * Constructor creates and initializes the variables needed for
   * the application
   */
  constructor() {
    // Initiate variables
    this.generatedSentence = document.getElementById("generated-sentence");
    this.diversity = 0.5;
    this.inputDiversity = document.getElementById("diversity");
    this.inputDiversity.onchange = (evt) => {
      this.diversity = evt.target.value/40.
      console.log('diversity changed to', this.diversity);
    }
    this.inputSeed = document.getElementById("seed");
    this.generateButton = document.getElementById("generate-button");
    this.generateButton.onclick = () => {
      this.generateText();
    }
    tf.loadLayersModel('model/model.json').then((model) => {
      console.log('loaded model');
      this.model = model;
      this.enableGeneration();
    });
  }

  /**
   * Called after model has finished loading or generating. 
   * Sets up UI elements for generating text.
   */
  enableGeneration() {
    this.generateButton.innerText = "Generate new text";
    this.generateButton.disabled = false;
  }

  /**
   * Predicts next character from given text and updates UI accordingly.
   * This is the main tfjs loop.
   */
  async generateText() {
    console.log('generating');
    let generated = this.inputSeed.value;
    this.generatedSentence.innerText = generated;
    this.generateButton.disabled = true;
    this.generateButton.innerText = "Pay attention to Nietzsche's words"
    for (let i = 0; i < CHARS_TO_GENERATE; i++) {
      const indexTensor = tf.tidy(() => {
        const input = this.convert(generated);
        const prediction = this.model.predict(input).squeeze();
        return this.sample(prediction);
      })
      const index = await indexTensor.data();
      indexTensor.dispose();
      generated += indices_char[index];
      this.generatedSentence.innerText = generated;
      await tf.nextFrame();
    }
    this.enableGeneration();
  }

  /**
   * Randomly samples next character weighted by model prediction.
   */
  sample(prediction) {
    return tf.tidy(() => {
      prediction = prediction.log();
      const diversity = tf.scalar(this.diversity);
      prediction = prediction.div(diversity);
      prediction = prediction.exp();
      prediction = prediction.div(prediction.sum());
      prediction = prediction.mul(tf.randomUniform(prediction.shape));
      return prediction.argMax();
    });
  }

  /**
   * Converts sentence to Tensor for feeding into model.
   */
  convert(sentence) {
    sentence = sentence.toLowerCase();
    sentence = sentence.split('').filter(x => x in char_indices).join('');
    if (sentence.length < INPUT_LENGTH) {
      sentence = sentence.padStart(INPUT_LENGTH);
    } else if (sentence.length > INPUT_LENGTH) {
      sentence = sentence.substring(sentence.length - INPUT_LENGTH);
    }
    const buffer = tf.buffer([1, INPUT_LENGTH, Object.keys(indices_char).length]);
    for (let i = 0; i < INPUT_LENGTH; i++) {
      let char = sentence.charAt(i)
      buffer.set(1, 0, i, char_indices[char]);
    }
    const input = buffer.toTensor();
    return input;
  }
}

window.addEventListener('load', () => new Main());
