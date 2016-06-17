define([
    'ko',
    'lib/utils/progress'
], function(ko, progress) {

    return {
        filterVisible: ko.observable(false),
        usersVisible: ko.observable(false),
        statusVisible: ko.observable(false),
        shareVisible: ko.observable(false),
        loading: ko.observable(false),
        status: ko.observable(''),
        statusIcon: ko.observable(),
        statusColor: ko.observable('#eee'),        
        defaultStatusColor: '#eee',

        progress: progress,
        openFileDialog: function(extension) {
            var deferred = $.Deferred();
            var chooser = document.querySelector('#file-dialog');
            chooser.setAttribute("accept", extension || '*');
            chooser.addEventListener("change", function(evt) {
                if (this.value)
                    deferred.resolve(this.value);
                else
                    deferred.reject();
            }, false);

            chooser.click();
            return deferred;
        }
    };


})