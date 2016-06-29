define([
    'knockout',
    'lib/user',
    'lib/utils/popup',
    'json!node_modules/analyze-facebook-history/emotions.json',
    'text!templates/stat.html',
    'json!lib/utils/colors.json'
], function(ko, user, popup, emotions, statTemplate, colors) {


    var stat = {
        openUser: function(userId) {
            var stat = user.userActivity()[userId];

            popup.open({
                userColor: colors[userId] || 'grey',
                stat: stat,
                emotions: emotions
            }, statTemplate);
        }
    };
    return stat;

    function generateStatistics() {

    }

});