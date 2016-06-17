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
    'lib/convert',
    'text'

], function(ko, templates, ui, processors, user, convert, text) {
    console.log(user);
    var vm = {
        error: ko.observable('No error'),
        templates: templates,
        ui: ui,
        user: user,
        processors: processors,

        loadingtest: function() {
            ui.loading(true);

            ui.progress.percent(30);
            ui.status('whaat');
        },
        share: function() {},
        actualProcessor: ko.observable(),

        // THIS IS A TEST
        extract: function() {
            convert.selectFile().done(function(data) {
                vm.user.metaData(data.messageData.parsingMetaData);
                vm.user.messages(data.messageData.messages);
                vm.user.userActivity(data.userActivity);
                vm.user.userName(data.messageData.parsingMetaData.userName);
            });

        }

    };
    // user.load();

    // DEBUG
    window.ko = ko;
    window.vm = vm;

    ko.applyBindings(vm, document.getElementById("body"));
});