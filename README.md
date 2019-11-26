# spring-data-rest-json-hal-client
Preconfigured rest npm package that acts like JSON+HAL JS-Client for Spring Data REST backend.

```javascript
'use strict';

const rest = require('rest');
const mime = require('rest/interceptor/mime');
const errorCode = require('rest/interceptor/errorCode');
const baseRegistry = require('rest/mime/registry');

const registry = baseRegistry.child();
registry.register('application/hal+json', require('rest/mime/type/application/hal'));
registry.register('application/schema+json', require('rest/mime/type/application/json'));
registry.register('application/json', require('rest/mime/type/application/json'));
registry.register('text/plain', require('rest/mime/type/text/plain'));
registry.register('text/uri-list', require('./mime/type/text/uri-list'));


const client = rest
  .wrap(mime, {registry: registry})
  .wrap(errorCode);

module.exports = client;
```

## How to use
First, import it into your Javascript file where you are going to use it:
```javascript
import client from 'spring-data-rest-json-hal-client';
```
 Then used it in the same fragment as follows:
```javascript
client(/* Your request type and its required paramenters */).then(/* What should be done after request gets responded */);
```

## Examples

### GET

```javascript
client({method: "GET", path: "/some/path"})
  .then(response => { console.log("Response:", response)});
```

```javascript
client({method: "GET", path: "/some/path"})
  .then(response => { console.log("Success:", response)}, response => { console.log("Error:", response)});
```

### PUT

```javascript
client({method: 'PUT', path: "/some/path", entity: {firstName: "Max", lastName: "Mustermann"}, headers: {'Content-Type': 'application/json'}})
  .then(response => {console.log("Success:", response)}, response =>
    {
      if (response.status.code === 403) {
        alert('ACCESS DENIED: You are not authorized to update!');
      } else if (response.status.code === 412) {
        alert('DENIED: Your copy is stale!');
      } else {
        console.log(response);
      }
    });
```

### DELETE

```javascript
client({method: "DELETE", path: "/some/path"})
  .then(response => {console.log("Success:", response)}, response =>
    {
      if (response.status.code === 403) {
        alert('ACCESS DENIED: You are not authorized to delete!');
      }
      else {
        console.log(response);
      }
    });
```
