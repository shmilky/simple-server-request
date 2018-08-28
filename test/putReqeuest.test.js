'use strict';

const simpleRequest = require('../src/simpleRequest');

function printCb (err, res) {
    console.log(JSON.stringify({err, res}, null, 2));
}

simpleRequest.put('http://localhost:4313/temp-path');

simpleRequest.put('http://localhost:4313/temp-path', [], printCb);

simpleRequest.put('http://localhost:4313/temp-path', {aaa: '111'}, printCb);

simpleRequest.put('http://localhost:4313/temp-path?aaa=111', {aa: {}}, printCb);

simpleRequest.put('http://localhost:4313/temp-path', {asdfadsf: []}, printCb);

