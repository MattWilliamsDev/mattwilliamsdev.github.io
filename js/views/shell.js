app.ShellView = Backbone.View.extend({

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {},

    selectMenuItem: function (menuItem) {
        $('.navbar .nav li').removeClass('active'); // Remove active class from all menu items
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});