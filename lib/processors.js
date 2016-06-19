define([
    'knockout',
    'convert/process',
    'convert/draw',


], function(ko, process, draw) {

    return [{
        id: 'activity_snake',
        name: 'Snake',
        process: process,
        draw: draw
    }];

});