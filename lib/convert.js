define([
    'ko',
    'lib/ui'
], function(ko, ui) {


    var fs = require("fs");
    var utils = require('../extract-messages-from-facebook-html/zip-utils');
    var analyze = require('../');
    var child_process = require('child_process');
    return {
        selectFile: selectFile,
        convert: convert
    };

    function selectFile() {
        ui.openFileDialog('.zip').done(function(filename) {
            console.log(filename);
            convert(filename);
        });

    }

    function convert(filename) {

        ui.status('Loading and parsing file...');
        if (utils.isFacebookArchiveZip()) {
            alert('I do not think that this is a facebook history zip. It may be corrupt?');
            return;
        }
        ui.status('Parsing history file, converting to JSON.');
        ui.loading(true);

        global.setTimeout(startParsing.bind(this, filename), 0);


    }

    /** 
     * Given the filename as a parameter starts a conversion
     * using the semi-async conversion, letting the UI to update.
     * For more info see parseAsync.
     */
    function startParsing(filename) {

        utils.parseAsync(filename, ui.progress).then(function(userRawData) {
            fs.writeFileSync('datasource.raw.json', JSON.stringify(userRawData));
            ui.status('File parsed, written to datasource.raw.json');
            ui.loading(false);
        });
    }

});