# tfjs-workshop

Contains material for a [TensorFlow.js workshop](https://www.meetup.com/Machine-Learning-Tokyo/events/260167619/).

Presentation slides at:

https://docs.google.com/presentation/d/1jHkbAQHWIXM7clDwTCzlqPPbnAd4xRoDo34sp6OHe_A/edit?usp=sharing

```
$ git clone git@github.com:Machine-Learning-Tokyo/tfjs-workshop.git
```

# Prerequisites

- [git](https://git-scm.com/)
- [nodejs](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)

To install nodejs, using [nvm](https://github.com/creationix/nvm) is recommended. 

# web
# web-js

They are simple application of image classification using [MobileNet](https://arxiv.org/abs/1704.04861) which is a light weight model for image classification. 

## Step 1. Run demo application with initial model

Web application demonstrating image classfication using MobileNet. The application classified the given image. The initial model will be downloaded from [TensorFlow Hub](https://tfhub.dev/) that is a registry for publishing pretrained deep learning models. 

```
$ cd web 
# Or
$ cd web-js

$ yarn
$ npx parcel src/index.html --open
```

It will automatically launch the webapp to classify the given image. Please look into index.html to change the image to be predicted.
That application is based on MobileNet demo in [tfjs-models](https://github.com/tensorflow/tfjs-models).

## Step 2. Train your own model in Colab

Now you can your own model in Google Colab with the image you have. Please refer to the instruction in [colab notebook](https://github.com/Machine-Learning-Tokyo/tfjs-workshop/blob/master/colab-notebooks/README.md). You can upload a image as the dataset used for training.

[tfjs-converter](https://github.com/tensorflow/tfjs-converter) is a tool to make a model readable by TensorFlow.js from pre-trained model by TensorFlow. It supports SavedModel, Keras model and so on. The colab gives you the model in the format imporable to TensorFlow.js. 

## Step 3. Run the demo application again with your own model.

The application can load the pre-trained model in [`tfjs_layers_model`](https://github.com/tensorflow/tfjs-converter#python-to-javascript). After the application is launched, the model should be put in the `dist` directory so that the application can load the model. You can find the template to create the loadable model in [Google Colab](https://colab.research.google.com/drive/1gRk3I3JudOl1u2ddvmSiVu1_ggS6hPvB).

```
$ cp -R ~/Downloads/mymobilenet.zip dist
$ cd dist && unzip mymobilenet.zip
$ npx parcel src/index.html --open
```

It is also necessary to change the code to switch the loaded model. 

- [Switching model in web](https://github.com/Machine-Learning-Tokyo/tfjs-workshop/blob/master/web/src/index.ts#L4-L7)
- [Switching model in web-js](https://github.com/Machine-Learning-Tokyo/tfjs-workshop/blob/master/web-js/src/index.js#L33-L37)

## Step 4. Publish the application in the internet

You can publish the application in the internet by using [GitHub pages](https://pages.github.com/). Please follow the instruction in [GitHub pages](https://pages.github.com/) to bootstrap the site. Once the repository is prepared, copy the artifacts of the application in `dist` to the repository. 

```
$ cd username.github.io
$ mv /path/to/tfjs-workshop/web/dist .
$ git add --all
$ git commit -m "Initial commit"
$ git push -u origin master
```

Then your will see the application in `http://username.github.io`.


