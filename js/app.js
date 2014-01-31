var app = {
    views: {},
    models: {},
    
    loadTemplates: function (views, callback) {
        var deferreds = [];

        $.each(views, function (index, view) {
            if (app[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function (data) {
                    app[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                if (typeof console !== 'undefined') {
                    console.error(view + ' not found');
                } else {
                    alert(view + ' not found');
                }
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }
};

app.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'home': 'home',
        'resume': 'resume',
        'contact': 'contact',
    },
    
    initialize: function () {
        app.shellView = new app.ShellView();
        $('body').html(app.shellView.render().el);
        this.$content = $('#content');
    },

    home: function () {
        if (!app.homeView) {
            app.homeView = new app.HomeView();
            app.homeView.render();
        } else {
            console.log('Reusing Home View');
            app.homeView.delegateEvents();
        }
        this.$content.html(app.homeView.el);
        app.shellView.selectMenuItem('home-menu');
    },
    
    resume: function () {
        if (!app.resumeView) {
            app.resumeView = new app.ResumeView();
            app.resumeView.render();
        }
        this.$content.html(app.resumeView.el);
        app.shellView.selectMenuItem('resume-menu');
    },
    
    contact: function () {
        if (!app.contactView) {
            app.contactView = new app.ContactView();
            app.contactView.render();
        }
        this.$content.html(app.contactView.el);
        app.shellView.selectMenuItem('contact-menu');
    }
});

$(function () {
    app.loadTemplates(['HomeView', 'ResumeView', 'ContactView', 'ShellView'],
        function () {
            app.router = new app.Router();
            Backbone.history.start({
                // pushState: true
            });
        });
});