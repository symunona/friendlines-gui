define([
    'knockout',
    'lib/ui',
    'storage',
    'lib/user'
], function(ko, ui, storage, user) {

    const ACTUAL_USER_NAME = 'actualUserName';

    var fs = require("fs");
    var utils = require('../extract-messages-from-facebook-html/zip-utils');
    var analyze = require('../analize-facebook-history/analyze');
    var convertUtils = require('../friendlines-convert-utils/convert-utils');
    var child_process = require('child_process');

    return {
        selectFile: selectFile,
        convert: convert,
        init: init
    };

    /**
     * If we had files parsed and opened, load the cache,
     * do not run conversion!
     */
    function init() {
        if (storage.exists(ACTUAL_USER_NAME)) {
            var userName = storage.load(ACTUAL_USER_NAME);
            console.log('Cache found, loading files');
            ui.status('Loading parsed data for ' + userName);
            try {
                var messageData = JSON.parse(fs.readFileSync(userName + '.filtered.json'));
                var userActivity = JSON.parse(fs.readFileSync(userName + '.stat.1.json'));
                loadDataToUser(messageData, userActivity);
                ui.status('Loaded from cache: ' + userName);
            } catch (e) {
                ui.status('Error opening cache file');
            }
        }
    }

    /**
     * Opens file dialog, loads and converts ZIP
     * @returns deferred resolved with userData
     */

    function selectFile() {
        var deferred = $.Deferred();
        ui.openFileDialog('.zip').done(function(filename) {
            convert(filename).done(function(userData) {
                deferred.resolve(userData);
            });
        });
        return deferred;
    }

    function convert(filename) {

        ui.status('Loading and parsing file...');
        if (utils.isFacebookArchiveZip()) {
            ui.status('Error reading fb history file');
            alert('I do not think that this is a facebook history zip. It may be corrupt?');
            return;
        }
        ui.status('Parsing history file, converting to JSON.');
        ui.loading(true);

        return startParsing(filename);
    }

    /** 
     * Given the filename as a parameter starts a conversion
     * using the semi-async conversion, letting the UI to update.
     * For more info see parseAsync.
     */
    function startParsing(filename) {

        // TODO: Check if already extracted, confirm overwrite, else, load from CACHE!

        var deferred = $.Deferred();

        /* Parse the selected file while letting UI refresh */
        utils.parseAsync(filename, ui.progress).then(function(userRawData) {
            var userName = utils.getUserNameFromZipFileName(filename);
            ui.status('Analyzing file...');

            /* Analyze data, get and merge main user, remove group messages, indicate emotions */
            var userFilteredData = analyze.analyze(userRawData);

            /* Export the file to the working dir for next time. */
            fs.writeFileSync(userName + '.filtered.json', JSON.stringify(userFilteredData));

            ui.status('File parsed results, written to ' + userName + '.filtered.json');

            /* Create per-user statistics */
            var userActivity = convertUtils.userActivityByMonth(userFilteredData);

            fs.writeFileSync(userName + '.stat.1.json', JSON.stringify(userActivity));

            ui.status('File parsed results, written to ' + userName + '.stat.1.json');

            ui.loading(false);

            storage.save(ACTUAL_USER_NAME, userName);

            loadDataToUser(userFilteredData, userActivity);

            deferred.resolve({
                messageData: userFilteredData,
                userActivity: userActivity
            });
        });
        return deferred;
    }

    function loadDataToUser(messageData, userActivity) {

        user.metaData(messageData.parsingMetaData);
        user.messages(messageData.messages);
        user.userActivity(userActivity);
        user.userName(messageData.parsingMetaData.userName);
    }

});