# include.js
Makes it possible and easy to load external data into the webpage without need of backend processing.

## Introduction
The idea is to split data and view structure, so that data can be stored in data only files, where view is simplified without need to contain data in it at the begining. The HTML tags that should contain particular data load it asynchroniusly afterwards. This also allows developers to deploy data (dynamic) content and static content independent. Another pro is that in addition it allows to move static content into CDN for fast loading and data either also in CDN or into another server that allows dynamic altering (consider cross-origin!).

The method is similar to the LaTeX's `\include{path/to/file.ext}` mechanismus and also works for recursive inclusion.
include.js is a short Javascript code, which adds a possibility to any HTML element to exchange its innerHTML or outerHTML to an external text file and makes it easy to load and bind an external or additional data to the website just adding an attribute to the element. It works like LaTeX's \include{filename.ext}. Concept is very simple and can be called lazy loading like lazy evaluation in Haskell. The included data is loaded after the completion of the loading of the page itself.

There is a posibility to build an endless loop e.g. a data that includes itself again. Please use the mechanismus wisely.
In this case, I do not take the responsibility, you are responsible if you build such a recursion or endless loop.

## Installation (Directly)
Just download the latest release from github and bind it as described in the How to section.

## Installation (NPM)
The latest release is always published into npmjs so you can bind the package also using `npm`.
```javascript
npm install --save-dev html-include.js
```
The name of the package in npmjs is `html-include.js` with `html-` prefix because the package name `include.js` was already taken by another project. How to use it as a npm package please learn how to use npm. After that just follow the instructions below.

## How to (a simple example)
If you have an HTML file similar the one above:
```html
<html>
  <head>...</head>
  <body>
  <h1>Hello World!</h1>
  <p>The best article in the world!</p>
  ...
  </body>
</html>
```

you can split the text from body like this:
just create e.g. `hello.txt` with content of `<h1>` tag:

`hello.txt`
>Hello World!

now create e.g. `article.txt` with content of `<p>` tag:

`article.txt`
>The best article in the world!

in the next step, just remove content from your HTML file and tell it that the contents should be loaded from the files above as follows:
```html
<html>
  <head>...</head>
  <body>
  <h1 include='hello.txt'></h1>
  <p include='article.txt'></p>
  ...
  </body>
</html>

now you need `include.js` to do the work for you. just add the script before closing `<body>` tag:
```html
<html>
  <head>...</head>
  <body>
  <h1 include='path/to/hello.txt'></h1>
  <p include='path/to/article.txt'></p>
  ...
  <script src='path/to/include.js'></script>
  </body>
</html>
```

that's all folks!

## How to (a complex example with replace and recursive include mechanismus)
to be continued...
