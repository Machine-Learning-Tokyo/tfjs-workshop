# tfjs-workshop

Contains material for a TensorFlow.js workshop

# Prerequisites

- [nodejs](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)

To install nodejs, using [nvm](https://github.com/creationix/nvm) is recommended. 

# web
# web-js

## Step 1. Run demo application with initial model

Web application demonstrating image classfication using MobileNet. The application classified the given image.

```
$ cd web 
# Or
$ cd web-js

$ yarn
$ npx parcel src/index.html --open
```

It will automatically launch the webapp to classify the given image.
That application is based on MobileNet demo in [tfjs-models](https://github.com/tensorflow/tfjs-models).

## Step 2. Train your own model in Colab

Now you can your own model in Google Colab with the image you have. Please refer to the instruction in [colab notebook](https://github.com/Machine-Learning-Tokyo/tfjs-workshop/blob/master/colab-notebooks/README.md). You can upload a image as the dataset used for training.

## Step 3. Run the demo application again with your own model.

The application can load the pre-trained model in [`tfjs_layers_model`](https://github.com/tensorflow/tfjs-converter#python-to-javascript). After the application is launched, the model should be put in the `dist` directory so that the application can load the model. You can find the template to create the loadable model in [Google Colab](https://colab.research.google.com/drive/1gRk3I3JudOl1u2ddvmSiVu1_ggS6hPvB).

```
$ cp -R ~/Downloads/mymobilenet.zip dist
$ cd dist && unzip mymobilenet.zip
$ npx parcel src/index.html --open
```

It is also necessary to change the code to switch the loaded model. 



