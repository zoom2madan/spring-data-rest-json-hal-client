# spring-data-rest-json-hal-index
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
registry.register('multipart/form-data', require('rest/mime/type/multipart/form-data'));
registry.register('text/plain', require('rest/mime/type/text/plain'));
registry.register('text/uri-list', require('./mime/type/text/uri-list'));

const index = rest
  .wrap(mime, {registry: registry})
  .wrap(errorCode);

module.exports = index;
```

## How to use
First, import the needed operation (`get`, `post`, `put`, `patch`, `del` or `index` for backwards compatibility or more complicated operations) into your Javascript file where you are going to use it:
```javascript
import {get} from '@khara/spring-data-rest-json-hal-index';
```
or
```javascript
import {post} from '@khara/spring-data-rest-json-hal-index';
```
or
```javascript
import {put} from '@khara/spring-data-rest-json-hal-index';
```
or
```javascript
import {patch} from '@khara/spring-data-rest-json-hal-index';
```
or
```javascript
import {del} from '@khara/spring-data-rest-json-hal-index';
```
or
```javascript
import {index} from '@khara/spring-data-rest-json-hal-index';
```
(`index` is for backwards compatibility or for real complicated operations that are not covered in simple requests) or more than one
```javascript
import {get, post, del} from '@khara/spring-data-rest-json-hal-index';
```
 Then use it in the same fragment as in the following examples:
```javascript
...
get('/api/users/all').then(successfulResponse => console.log(successfulResponse), error => console.error(error));
get('/api/users/all', {'Content-Type': 'application/json'}).then(successfulResponse => console.log(successfulResponse), error => console.error(error));
...
index(/* Your request type and its required paramenters */).then(/* What should be done after request gets responded */);
...
```

## Examples
`path` is always required logically, but headers and entity are optional depending from your services.
### GET

```javascript
get('/some/path').then(successfulResponse => console.log(successfulResponse), error => console.error(error));
```
or with headers
```javascript
get('/some/path', {'Content-Type': 'application/json'}).then(successfulResponse => console.log(successfulResponse), error => console.error(error));
```
or backwards compatible
```javascript
index({method: 'GET', path: '/some/path'})
  .then(response => { console.log('Success:', response)}, response => { console.log('Error:', response)});
...
index({method: 'GET', path: '/some/path', headers: {'Content-Type': 'application/json'}})
  .then(response => { console.log('Success:', response)}, response => { console.log('Error:', response)});
```

### POST

```javascript
post('/some/path', {firstName: 'Max', lastName: 'Mustermann'}, {'Content-Type': 'application/json'})
  .then(
    successfulResponse => {console.log('Success:', successfulResponse)},
    errorResponse => {
      if (errorResponse.status.code === 403) {
        alert('ACCESS DENIED: You are not authorized to update!');
      } else if (errorResponse.status.code === 412) {
        alert('DENIED: Your copy is stale!');
      } else {
        console.log(errorResponse);
      }
    });
```
or backwards compatible
```javascript
index({method: 'POST', path: '/some/path', entity: {firstName: 'Max', lastName: 'Mustermann'}, headers: {'Content-Type': 'application/json'}})
  .then(
    response => {console.log('Success:', response)},
    response => {
      if (response.status.code === 403) {
        alert('ACCESS DENIED: You are not authorized to update!');
      } else if (response.status.code === 412) {
        alert('DENIED: Your copy is stale!');
      } else {
        console.log(response);
      }
    });
```

### PUT

```javascript
put('/some/path', {firstName: 'Max', lastName: 'Mustermann'}, {'Content-Type': 'application/json'})
  .then(
    successfulResponse => {console.log('Success:', successfulResponse)},
    errorResponse => {
      if (errorResponse.status.code === 403) {
        alert('ACCESS DENIED: You are not authorized to update!');
      } else if (errorResponse.status.code === 412) {
        alert('DENIED: Your copy is stale!');
      } else {
        console.log(errorResponse);
      }
    });
```
or backwards compatible
```javascript
index({method: 'PUT', path: '/some/path', entity: {firstName: 'Max', lastName: 'Mustermann'}, headers: {'Content-Type': 'application/json'}})
  .then(
    response => {console.log('Success:', response)},
    response => {
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
del('/some/path', {'Content-Type': 'application/json'})
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
or backwards compatible
```javascript
index({method: 'DELETE', path: '/some/path', headers: {'Content-Type': 'application/json'}})
  .then(
    response => {console.log('Success:', response)},
    response => {
      if (response.status.code === 403) {
        alert('ACCESS DENIED: You are not authorized to delete!');
      }
      else {
        console.log(response);
      }
    });
```
