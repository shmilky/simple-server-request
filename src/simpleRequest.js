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

module.exports.get = function (path, queryParams, cb) {
    if (!path || path.length === 0) {
        cb && cb('pathNotValid');

        return;
    }

    if (typeof queryParams === 'function') {
        cb = queryParams;
        queryParams = null;
    }

    // Add ? at the end of the path if there are query params and it's needed
    if (queryParams && Object.keys(queryParams).length > 0 && path[path.length - 1] !== '?') {
        path += '?'
    }

    path += stringify(queryParams);

    request.get({
        url: path,
        json: true,
        timeout: GET_TIMEOUT,
    }, function(err, res, body) {
        let resData = body;

        if (body && body.data) {
            resData = body.data;
        }

        if (!err && res.statusCode === 200) {
            cb && cb(null, resData);
        }
        else {
            cb && cb((res && getErrObjectFromRes(res)) || err);
        }
    });
};

module.exports.post = function (path, body, cb) {
    request.post({
        url: path,
        json: true,
        timeout: POST_TIMEOUT,
        body: body,
    }, function(err, res, body) {
        if (!err && res.statusCode === 200) {
            cb && cb(null, body.data || body);
        }
        else {
            cb && cb(err || getErrObjectFromRes(res));
        }
    });
};

/**
 * Send a put request to designated path
 * @param path - full path of the request
 * @param body - post content
 * @param cb - (optional) callback for the response
 */
module.exports.put = function (path, body, cb) {
    request.put({
        url: path,
        json: true,
        timeout: POST_TIMEOUT,
        body: body,
    }, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            cb && cb(null, body.data || body);
        }
        else {
            cb && cb(err || getErrObjectFromRes(res));
        }
    });
};
