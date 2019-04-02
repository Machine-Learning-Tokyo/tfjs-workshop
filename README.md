# tfjs-workshop

Contains material for a TensorFlow.js workshop

## web

Web application demonstrating image classfication using MobileNet. The application classified the given image.

```
$ npx parcel src/index.html --open
```

It will automatically launch the webapp to classify the given image.
That application is based on MobileNet demo in [tfjs-models](https://github.com/tensorflow/tfjs-models).
The application can load the pre-trained model in [`tfjs_layers_model`](https://github.com/tensorflow/tfjs-converter#python-to-javascript). After the application is launched, the model should be put in the `dist` directory so that the application can load the model. You can find the template to create the loadable model in [Google Colab](https://colab.research.google.com/drive/1gRk3I3JudOl1u2ddvmSiVu1_ggS6hPvB).

```
$ cp -R ~/Downloads/mymobilenet.zip dist
$ cd dist && unzip mymobilenet.zip
```

## web-js

This is the same application written in pure JavaScript.

```
$ npx parcel src/index.html --open
```

It will automatically launch the webapp to classify the given image.
That application is based on MobileNet demo in [tfjs-examples](https://github.com/tensorflow/tfjs-examples/tree/master/mobilenet).
