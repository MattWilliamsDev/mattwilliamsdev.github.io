app.HomeView = Backbone.View.extend({

    events: {
        'click #resume-btn': 'resumeBtnClick'
    },
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    resumeBtnClick: function (e) {
        console.log('Resume Btn Click', e);
        app.router.navigate('resume', { trigger: true });
    }

});