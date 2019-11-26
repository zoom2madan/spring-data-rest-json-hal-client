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