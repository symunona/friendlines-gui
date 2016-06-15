requirejs.config({
    baseUrl: '',

    paths: {
        ko: 'node_modules/knockout/build/output/knockout-latest.debug',
        jQuery: 'node_modules/jquery/dist/jquery.min',
        text: 'node_modules/requirejs-text/text',
        convert: '../friendlines-convert-1'

    }
});



define([
    'ko',
    'lib/templates',
    'lib/ui',
    'lib/processors',
    'lib/user',
    'text'

], function(ko, templates, ui, processors, user, text) {
    console.log(user);
    var vm = {
        error: ko.observable('No error'),
        templates: templates,
        loading: ko.observable(false),
        ui: ui,
        user: user,
        processors: processors,

        // ko.observableArray([{
        //     name: 'vis1'
        // }]),
        actualProcessor: ko.observable(),

        // THIS IS A TEST
        extract: function() {
            // TODO: convert cache
            // TODO: open file
            var parser = require('../extract-messages-from-facebook-html/html-message-parse-utils');
            var fs = require("fs");
            var utils = require('../extract-messages-from-facebook-html/zip-utils');
            var userRawData = utils.parse('../extract-messages-from-facebook-html/facebook-test.zip');
            fs.writeFileSync('datasource.raw.json', userRawData);
        }

    };
    user.load();

    // DEBUG
    window.ko = ko;
    window.vm = vm;

    ko.applyBindings(vm, document.getElementById("body"));
});