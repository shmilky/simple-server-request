'use strict';

const simpleRequest = require('../src/simpleRequest');

function printCb (err, res) {
    console.log(JSON.stringify({err, res}, null, 2));
}

simpleRequest.get('http://localhost:4313/temp-path', printCb);

simpleRequest.get('http://localhost:4313/temp-path', {aaa: '111'}, printCb);

simpleRequest.get('http://localhost:4313/temp-path?aaa=111', printCb);

simpleRequest.get('http://localhost:4313/temp-path', {}, printCb);

simpleRequest.get('http://localhost:4313/temp-path?', {}, printCb);