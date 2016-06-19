define([
    'knockout',
    'text!templates/filter.1.html',
    'text!templates/userfilter.html',
    'lib/user',
    'wrap'


], function(ko, filter1Template, userFilterTemplate, user, wrap) {
    var defaultFilter = {
        name: 'default',
        orderBy: ['leng', 'cnt'],
        descendingOrderBy: true,
        min: {
            count: 10,
            length: 100
        },
        minActiveMonthCount: 3,
        userFilter: {},
        editable: true
    };



    var filter = {
        actual: wrap.fromJS(defaultFilter),
        actualRenderableUserList: ko.observable(),
        userToRenderMap: {},
        apply: function() {

            return;
        },
        consts: {
            orderBys: ['startDate', 'endDate', 'count', 'length', 'happy']
                .map(function(e) {
                    return {
                        name: e,
                        val: e
                    };
                })
        },
        save: function saveFilter() {

            var name = prompt("Enter a name for the filter");
            filter = $.extend(true, {}, getFilter(), {
                name: name
            });
            filters.push(filter);

        },
        editable: function() {
            return true;
        }
    };

    /**
     * Extend the userToRenderMap with the renderable
     * users, if they do not exist in the map. 
     */
    filter.actualRenderableUserList.subscribe(function(renderableUsers) {
        for (var userId in renderableUsers) {
            if (filter.userToRenderMap[userId] === undefined) {
                filter.userToRenderMap[userId] = ko.observable(true);
            }
        }

    });

    /** Register the filter components */

    ko.components.register('filter', {
        viewModel: function(params) {
            $.extend(this, filter);
            return filter;
        },
        template: filter1Template
    });

    ko.components.register('userfilter', {
        viewModel: function(params) {
            return {
                actualRenderableUserList: filter.actualRenderableUserList,
                userToRenderMap: filter.userToRenderMap,
                isIn: function(item) {
                    return filter.userToRenderMap[item.id]();
                },
                color: user.color,
            };
        },
        template: userFilterTemplate
    });


    return filter;

});