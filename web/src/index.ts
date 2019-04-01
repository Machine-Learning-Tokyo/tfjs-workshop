import * as mobilenet from './mobilenet';

async function run(img: HTMLImageElement) {
  // Load the model from TensorHub.
  const model = await mobilenet.load(2, 1.0, false);
  // Load the model from local
  // const model = await mobilenet.load(2, 1.0, true);

  // Classify the image.
  const predictions = await model.classify(img);

  const predictionsElement = document.getElementById('predictions');
  predictions.forEach(prediction => {
    const elem = document.createElement('tr');
    elem.innerHTML = `<th>${prediction.className}</th><th>${prediction.probability}</th>`;
    predictionsElement.appendChild(elem);
  });  

  console.log('Predictions');
  console.log(predictions);  
  // Get the logits.
  const logits = model.infer(img);
  console.log('Logits');
  logits.print(true);
}

window.onload = (e) => {
  const img = document.getElementById('img') as HTMLImageElement;   
  run(img);
}