requirejs.config({
    baseUrl: '',
    paths: {
        knockout: 'node_modules/knockout/build/output/knockout-latest.debug',
        ko: 'knockout',
        wrap: 'lib/utils/knockout.wrap',
        jQuery: 'node_modules/jquery/dist/jquery.min',
        text: 'node_modules/requirejs-text/text',
        json: 'node_modules/requirejs-plugins/src/json',
        convert: '../friendlines-convert-1',
        storage: 'lib/utils/storage',
        _: 'node_modules/underscore/underscore-min'
    }
});


define([
    'knockout',
    'lib/templates',
    'lib/ui',
    'lib/processors',
    'lib/user',
    'lib/convert',
    'lib/filter',
    'text',
    'wrap',
    'json'



], function(ko, templates, ui, processors, user, convert, filter, text, wrap) {

    var vm = {
        error: ko.observable(''),
        templates: templates,
        ui: ui,
        user: user,
        processors: processors,
        filter: filter,

        loadingtest: function() {
            ui.loading(true);

            ui.progress.percent(30);
            ui.status('');
        },
        share: function() {},

        preRender: function() {

            /* Apply the filter, get the filtered userlist and metadata back. */
            var preProcessedUserData = vm.actualProcessor().process(user.userActivity(), wrap.toJS(filter.actual));

            console.log(preProcessedUserData);
            /* Update the renderable userlist */
            filter.actualRenderableUserList(preProcessedUserData.filteredUsers);

            vm.render();

        },
        render: function() {

            /* Render everything*/
            // vm.actualProcessor.draw(filter.filteredUserData());

        },
        actualProcessor: ko.observable(),

        extract: convert.selectFile

    };

    /* Loads last user who have been loaded */
    convert.init();

    /* Loads the first processor and drawer */
    vm.actualProcessor(processors[0]);

    // DEBUG
    window.ko = ko;
    window.vm = vm;

    ko.applyBindings(vm, document.getElementById("body"));
});