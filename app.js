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
        actualProcessor: ko.observable()
    };
    user.load();

    // DEBUG
    window.ko = ko;
    window.vm = vm;

    ko.applyBindings(vm, document.getElementById("body"));
});