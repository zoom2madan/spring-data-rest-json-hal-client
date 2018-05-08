# include.js
Makes it possible and easy to load external data into the webpage without need of backend processing.

The idea is to split data and view structure, so that data can be stored in data only files, where view is simplified without need to contain data in it at the begining. The HTML tags that should contain particular data load it asynchroniusly afterwards. This also allows developers to deploy data (dynamic) content and static content independent. Another pro is that in addition it allows to move static content into CDN for fast loading and data either also in CDN or into another server that allows dynamic altering (consider cross-origin!).

The method is similar to the LaTeX's `\include{path/to/file.ext}` mechanismus and also works for recursive inclusion.

There is a posibility to build an endless loop e.g. a data that includes itself again. Please use the mechanismus wisely.
In this case, I do not take the responsibility, you are responsible if you build such a recursion or endless loop.

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
