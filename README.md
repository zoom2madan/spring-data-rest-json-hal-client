# include.js
Makes it possible and easy to load external data into the webpage without need of backend processing.

The idea is to split data and view structure, so that, data can be stored in data only files,
where view is simplified without need to contain data in it at the begining.
The HTML tags that should contain particular data load it asynchroniusly afterwards.

The method is similar to the LaTeX's \include{path/to/file.ext} mechanismus and also works for recusive inclusion.

There is a posibility to build an endless loop e.g. a data that includes itself again. Please use the mechanismus wisely.
In this case, author does not take the responsibility, you are responsible if you build such a recursion or endless loop.

## How to
