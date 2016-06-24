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
    'json',
    'json!lib/utils/colors.json'



], function(ko, templates, ui, processors, user, convert, filter, text, wrap, json, colors) {

    var app = {
        error: ko.observable(''),
        templates: templates,
        ui: ui,
        user: user,
        processors: processors,
        filter: filter,
        colors: colors,

        loadingtest: function() {
            ui.loading(true);
            ui.progress.percent(30);
            ui.status('');
        },
        share: function() {},

        preRender: function() {

            /* Apply the filter, get the filtered userlist and metadata back. */
            var f = wrap.toJS(filter.actual);

            var preProcessedUserData = app.actualProcessor().process(user.userActivity(), f);

            console.log(preProcessedUserData);
            /* Update the renderable userlist */
            filter.actualRenderableUserList(preProcessedUserData.filteredUsers);

            app.render();

        },
        render: function() {
            // TODO: Check if this filter's SVG is already cached
            // generate param, filter, userlist and processorId hash

            var params = {
                xStep: 50,
                yStep: 25,
                yScale: 1,
            };
            /* Render everything*/
            ui.loading(true);
            ui.status('Drawing...');
            setTimeout(function() {
                var drawing = app.actualProcessor()
                    .draw('#timeline', filter.usersToRender(), params, filter, colors);
                ui.loading(false);
            }, 0);


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
    app.actualProcessor(processors[0]);

    // DEBUG
    window.ko = ko;
    window.app = app;

    ko.applyBindings(app, document.getElementById("body"));

    // for testing 
    setTimeout(app.preRender, 0);

});