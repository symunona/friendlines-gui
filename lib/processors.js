define([
    'ko',
    'convert/process',
    'convert/draw'

], function(ko, process, draw) {

    return [{
        process: process,
        draw: draw
    }];

});