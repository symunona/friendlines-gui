requirejs.config({
    baseUrl: '',

    paths: {
        ko: 'node_modules/knockout/build/output/knockout-latest.debug',
        text: 'node_modules/requirejs-text/text'
    }
});

define([
    'ko',
    'lib/templates',
    'lib/ui',
    'text'

], function(ko, templates, ui, text) {

    var vm = {
        error: ko.observable('No error'),
        templates: templates,
        loading: ko.observable(false),
        ui: ui,
        user: ko.observable({
            username: 'Dummy Tibor'
        }),
        processors: ko.observableArray([{
            name: 'vis1'
        }]),
        actualProcessor: ko.observable()
    };

    // DEBUG
    window.ko = ko;
    window.vm = vm;

    ko.applyBindings(vm, document.getElementById("body"));
});