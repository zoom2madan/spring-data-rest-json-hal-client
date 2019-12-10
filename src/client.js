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

const client = {};

client.request = rest
  .wrap(mime, {registry: registry})
  .wrap(errorCode);


client.get = function(path, headers) {
  return client.request({method: "GET", path: path, headers: headers});
};

client.post = function(path, entity, headers) {
  return client.request({method: 'POST', path: path, entity: entity, headers: headers});
};

client.put = function(path, entity, headers) {
  return client.request({method: 'PUT', path: path, entity: entity, headers: headers});
};

client.patch = function(path, entity, headers) {
  return client.request({method: 'PATCH', path: path, entity: entity, headers: headers});
};

client.del = function(path, headers) {
  return client.request({method: "DELETE", path: path, headers: headers});
};

module.exports = client;
