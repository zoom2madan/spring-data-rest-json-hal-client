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
```
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

### Result:
```html
<html>
  <head>...</head>
  <body>
  <h1>Hello World!</h1>
  <p>The best article in the world!</p>
  ...
  <script src='path/to/include.js'></script>
  </body>
</html>
```
that's all folks!

## How to (a more complexer example with replace)
In the following example, the page will be loaded with a spinner or whatever html code that shows a loading spinner
or progress or something else. Afterwards, `innerHTML` of the '\<p\>' will be replaced, but other attributes will remain.
```html
<html>
  <head>...</head>
  <body>
  <h1 include='path/to/hello.txt'></h1>
  <p include='path/to/article.txt' class='some-class' some-attribute='some-value'>
    <div class='your-spinner-class'>your spinner or whatever html code</div>
  </p>
  ...
  <script src='path/to/include.js'></script>
  </body>
</html>
```

### 9iResult:
```html
<html>
  <head>...</head>
  <body>
  <h1>Hello World!</h1>
  <p class='some-class' some-attribute='some-value'>The best article in the world!</p>
  ...
  <script src='path/to/include.js'></script>
  </body>
</html>
```

However, in the following example, the page will be loaded with a spinner or whatever html code that shows
a loading spinner or progress or something else. But `replace='true'` tells that the whole '\<p\>' tag must
be replaced by new content.
```html
<html>
  <head>...</head>
  <body>
  <h1 include='path/to/hello.txt'></h1>
  <p include='path/to/article.txt' replace='true' class='some-class' some-attribute='some-value'>
    <div class='your-spinner-class'>your spinner or whatever html code</div>
  </p>
  ...
  <script src='path/to/include.js'></script>
  </body>
</html>
```

### Result:
```html
<html>
  <head>...</head>
  <body>
  <h1>Hello World!</h1>
  The best article in the world!
  ...
  <script src='path/to/include.js'></script>
  </body>
</html>
```
## How to (recursive include mechanism)
You can also load an html content, like '.txt' in the examples above. In this case, the loaded html content also will
be searched for any new `include='path''` attribute. E.g.:

`part1.html`
```html
<div>part1 content</div>
<div include="part2.html">should be replaced</div>
```

`part2.html`
```html
<div>part2 content</div>
```

`index.html`
```html
<html>
  <head>...</head>
  <body>
  <h1 include='path/to/hello.txt'></h1>
  <div include='part1.html' replace='true'>
    <div class='your-spinner-class'>your spinner or whatever html code</div>
  </div>
  ...
  <script src='path/to/include.js'></script>
  </body>
</html>
```

On rendering `index.html`, at first `part1.html` will be loaded. Directly after that, the script finds out
that the latter also have an `include='dome-path'` attribute and loads it also with a second AJAX-call.

### Result
`index.html`
```html
<html>
  <head>...</head>
  <body>
  <h1>Hello World!</h1>
  <div>part1 content</div>
  <div>
    <div>part2 content</div>
  </div>
  ...
  <script src='path/to/include.js'></script>
  </body>
</html>
```

### Warning
With a latter mechanism you can end up building an endless loop, if the included parts will include themselves or
include each-other transitively. E.g: 'part1.html' includes 'part2.html' and 'part2.html' also includes 'part1.html' or
'part1.html' includes itself again.
