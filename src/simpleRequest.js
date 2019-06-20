'use strict';

const request = require('request');
const {stringify} = require('query-string');

const {GET_TIMEOUT, POST_TIMEOUT} = process.env;

function getErrObjectFromRes(res) {
    if (res.statusCode === 200) {
        return null;
    }

    if (res.body && res.body.errorMessage) {
        return res.body.errorMessage;
    }

    return res.errorMessage || `${res.statusCode} error of message "${res.statusMessage}"`
}

function constructUrlWithQueryString (path, queryParams={}) {
    queryParams = stringify(queryParams);

    // Add ? at the end of the path if there are query params and it's needed
    if (queryParams.length > 0 && path[path.length - 1] !== '?') {
        path += '?' + queryParams;
    }

    return path;
}


function handleResponseFactory (resolve, reject) {
    return function (err, res, body) {
        if (!err && res.statusCode === 200) {
            resolve(body.data || body);
        }
        else {
            reject(err || getErrObjectFromRes(res));
        }
    }
}

module.exports.handleResponseFactory = handleResponseFactory;
module.exports.constructUrlWithQueryString = constructUrlWithQueryString;

module.exports.get = function (path, queryParams={}, headers={}) {
    console.log(`get req for path ${path} with query params ${JSON.stringify(queryParams)}`);

    return new Promise(function (resolve, reject) {
        if (!path || path.length === 0) {
            reject('pathNotValid');
        }
        else {
            request.get({
                url: constructUrlWithQueryString(path, queryParams),
                headers,
                json: true,
                timeout: GET_TIMEOUT,
            }, handleResponseFactory(resolve, reject));
        }
    });
};

module.exports.post = function (path, body={}, headers={}) {
    return new Promise(function (resolve, reject) {
        if (!path || path.length === 0) {
            reject('pathNotValid');
        }
        else {
            request.post({
                url: path,
                headers,
                json: true,
                timeout: POST_TIMEOUT,
                body: body,
            }, handleResponseFactory(resolve, reject));
        }
    });
};

module.exports.put = function (path, body={}, headers={}) {
    return new Promise(function (resolve, reject) {
        if (!path || path.length === 0) {
            reject('pathNotValid');
        }
        else {
            request.put({
                url: path,
                headers,
                json: true,
                timeout: POST_TIMEOUT,
                body: body,
            }, handleResponseFactory(resolve, reject));
        }
    });
};

module.exports.delete = function (path, queryParams={}, headers={}) {
    console.log(`get req for path ${path} with query params ${JSON.stringify(queryParams)}`);

    return new Promise(function (resolve, reject) {
        if (!path || path.length === 0) {
            reject('pathNotValid');
        }
        else {
            request.delete({
                url: constructUrlWithQueryString(path, queryParams),
                headers,
                json: true,
                timeout: GET_TIMEOUT,
            }, handleResponseFactory(resolve, reject));
        }
    });
};