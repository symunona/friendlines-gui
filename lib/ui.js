define([
    'ko'
], function(ko) {

    return {
        filterVisible: ko.observable(false),
        usersVisible: ko.observable(false),
        loading: ko.observable(false)
    };


})