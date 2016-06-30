define([
    'knockout',
    'lib/user',
    'lib/utils/popup',
    'text!templates/search-results.html',
    'json!lib/utils/colors.json',
    // 'node_modules/jquery/dist/jquery.min',
    // 'node_modules/jquery-highlight/jquery.highlight'
], function(ko, user, popup, searchResultTemplate, colors) {
    var search = {
        openSearchResult: function() {
            popup.open({
                    colors: colors,
                    messages: search.searchResult,
                    keyword: search.searchKeyword
                }, searchResultTemplate
                // function(element) {
                //     $(element).highlight(search.searchKeyword())
                // }
            )
        },
        searchKeyword: ko.observable(),
        searchResult: ko.observableArray(),
        searchByKeyword: function() {
            search.searchResult(searchByKeyword())
        },
        searchKeyDown: function(context, event) {
            if (event.keyCode == 13) {
                if ($(event.target).val().length < 2) {
                    alert('Please specify at least 2 character long search string!');
                    return;
                }
                search.searchKeyword($(event.target).val());
                search.searchResult(_.sortBy(searchByKeyword(search.searchKeyword()), 'sendDate'));
                search.openSearchResult();
            }
            return true;
        }

    }

    ko.bindingHandlers.highlight = {
        update: function(element, valueAccessor) {
            var options = valueAccessor();
            var value = ko.utils.unwrapObservable(options.text);
            var search = ko.utils.unwrapObservable(options.highlight);
            var css = ko.utils.unwrapObservable(options.css) || 'highlight';
            var replacement = '<span class="' + css + '">' + search + '</span>';
            element.innerHTML = value.replace(new RegExp(search, 'g'), replacement);
        }
    };

    return search;

    function searchByKeyword(keyword) {
        return user.messages().filter(function(message) {
            if (message.message.indexOf(keyword) > -1) {
                return true
            }
            return false
        })
    }
})