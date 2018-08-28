'use strict';

const simpleRequest = require('../src/simpleRequest');

function printCb (err, res) {
    console.log(JSON.stringify({err, res}, null, 2));
}

simpleRequest.post('http://localhost:4313/temp-path');

simpleRequest.post('http://localhost:4313/temp-path', [], printCb);

simpleRequest.post('http://localhost:4313/temp-path', {aaa: '111'}, printCb);

simpleRequest.post('http://localhost:4313/temp-path?aaa=111', {aa: {}}, printCb);

simpleRequest.post('http://localhost:4313/temp-path', {asdfadsf: []}, printCb);

