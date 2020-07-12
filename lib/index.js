'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var rest = require('rest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');
var baseRegistry = require('rest/mime/registry');
var registry = baseRegistry.child();
registry.register('application/hal+json', require('rest/mime/type/application/hal'));
registry.register('application/schema+json', require('rest/mime/type/application/json'));
registry.register('application/json', require('rest/mime/type/application/json'));
registry.register('multipart/form-data', require('rest/mime/type/multipart/form-data'));
registry.register('text/plain', require('rest/mime/type/text/plain'));
registry.register('text/uri-list', require('./mime/type/text/uri-list'));
var client = rest
    .wrap(mime, { registry: registry })
    .wrap(errorCode);
exports.default = client;
function get(path, headers) {
    return client({ method: "GET", path: path, headers: headers });
}
exports.get = get;
function post(path, entity, headers) {
    return client({ method: 'POST', path: path, entity: entity, headers: headers });
}
exports.post = post;
function put(path, entity, headers) {
    return client({ method: 'PUT', path: path, entity: entity, headers: headers });
}
exports.put = put;
function patch(path, entity, headers) {
    return client({ method: 'PATCH', path: path, entity: entity, headers: headers });
}
exports.patch = patch;
function del(path, headers) {
    return client({ method: "DELETE", path: path, headers: headers });
}
exports.del = del;
