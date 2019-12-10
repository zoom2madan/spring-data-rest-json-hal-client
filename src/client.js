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

export default client;

export function get(path, headers) {
  return client({method: "GET", path: path, headers: headers});
}

export function post(path, entity, headers) {
  return client({method: 'POST', path: path, entity: entity, headers: headers});
}

export function put(path, entity, headers) {
  return client({method: 'PUT', path: path, entity: entity, headers: headers});
}

export function patch(path, entity, headers) {
  return client({method: 'PATCH', path: path, entity: entity, headers: headers});
}

export function del(path, headers) {
  return client({method: "DELETE", path: path, headers: headers});
}