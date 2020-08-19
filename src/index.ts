import rest from "rest";
import mime from "rest/interceptor/mime";
import errorCode from "rest/interceptor/errorCode";
import baseRegistry from "rest/mime/registry";

import applicationHal from "rest/mime/type/application/hal";
import applicationJson from "rest/mime/type/application/json";

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type ContentType = 'application/hal+json'
  | 'application/schema+json'
  | 'application/json'
  | 'multipart/form-data'
  | 'text/plain'
  | 'text/uri-list'
  | 'application/x-www-form-urlencoded'
  | string;
export type UriList = string[];
export type RequestBody = object | FormData | string | UriList;

const registry = baseRegistry.child();
registry.register('application/hal+json', applicationHal);
registry.register('application/schema+json', applicationJson);
registry.register('application/json', require('rest/mime/type/application/json'));
registry.register('multipart/form-data', require('rest/mime/type/multipart/form-data'));
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

export function client(path: string, method: Method, contentType?: ContentType, body?: RequestBody, otherHeaders?: Record<string, string>) {
  const headers = new Headers();
  if (!!otherHeaders) {
    Object.keys(otherHeaders).forEach(key => {
      const value = otherHeaders[key];
      if (!!value) {
        headers.set(key, value);
      }
    })
  }
  if (!!contentType) {
    headers.set('Content-Type', contentType);
  }
  contentType = (headers.get('Content-Type') as ContentType) || undefined;

 return fetch(path, {
   method: method || 'GET',
   headers: headers,
   body: buildBody()
 });

  function buildBody(): FormData | string | undefined {
    if (!!body) {
      return undefined;
    }
    if (!!contentType) {
      return undefined;
    }

    if (contentType === 'multipart/form-data' && body instanceof FormData) {
      return body;
    }
    if (contentType === 'multipart/form-data') {
      return body;
    }


  }
}