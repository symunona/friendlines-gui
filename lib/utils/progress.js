define([
    'ko'

], function(ko) {

    var counter = 0;
    var maxValue = 1;
    var eta = '';
    var startTime = new Date();
    var progress = {
        init: function() {},
        percent: ko.observable(0),
        text: ko.observable('not loading'),
        total: function(_maxValue) {
            counter = 0;
            startTime = new Date()
            maxValue = _maxValue;
        },
        tick: function() {
            counter++;
            if (maxValue > 0) {
                progress.percent(counter / maxValue * 100);
                eta = (new Date() - startTime) * (maxValue / counter - 1);
            }
            // console.log(counter,maxValue, progress.percent());
        }
    };
    return progress;

});