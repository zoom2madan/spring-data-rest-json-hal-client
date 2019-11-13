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
// TODO
client(...).then();
```