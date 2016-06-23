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
        _: 'node_modules/underscore/underscore-min',
        d3: 'node_modules/d3/d3',
        moment: 'node_modules/moment/min/moment.min'
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
            // TODO: Check if this filter's SVG is already cached
            // generate param, filter, userlist and processorId hash

            var params = {
                xStep: 50,
                yStep: 50,
                yScale: 1,
            };
            /* Render everything*/
            var drawing = vm.actualProcessor().draw('#timeline', filter.usersToRender(), params);

            // TODO: bind event handlers to drawing

            // TODO: If not cached, save it to the cache
        },
        test: function() {

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

    // for testing 
    setTimeout(vm.preRender, 0);

});