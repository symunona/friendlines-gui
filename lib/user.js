define([
    'ko',
    'lib/data-loader',
    'lib/ui'
], function(ko, dataLoader, ui) {
    var user = {
        meta: ko.observable({
            username: 'Dummy Tibor'
        }),
        stat: ko.observable(),
        messages: ko.observable(),
        username: ko.observable(),
        load: function() {
            ui.loading(true);
            var p1 = dataLoader.loadStatFile().then(function(userData) {
                user.stat(userData);
            });
            var p2 = dataLoader.loadMetaFile().then(function(userMetaData) {
                user.meta(userMetaData);
                // TODO: convert/extractor exports main username from settings!
                user.username(user.meta().userIdMap[user.meta().mainUserId]);
            });
            $.when(p1, p2).always(function() {
                ui.loading(false);
            });

            return user;
        }
    };
    return user;

});