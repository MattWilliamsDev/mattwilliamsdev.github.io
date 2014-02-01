var app = {
    elements: {},
    models: {},
    
    loader: function (options, callback) {
        var
        type,
        url = {},
        elements = options.elements
        deferreds = [];

        switch (options.type) {
            case 'templates':
            case 'template':
            case 'tpl':
            case 'views':
                url.folder = 'tpl/';
                url.extension = '.html';
                url.returnType = 'html';
                break;

            case 'script':
            case 'js':
                url.folder = 'js/';
                url.extension = '.js';
                url.returnType = 'js';
                break;

            case 'vendor':
                url.folder = 'vendor/';
                url.extension = '.js';
                url.returType = 'js';
                break;
        }

        $.each(elements, function (index, element) {
            var
            script,
            getUrl;

            getUrl = url.folder + element + url.extension;
            console.log('Get URL', getUrl);

            if (app[element]) {
                deferreds.push($.get(getUrl, function (data) {
                    if (url.returnType === 'html')
                        app[element].prototype.template = _.template(data);
                    else if (url.returnType === 'js') {
                        $script = $('<script/>');
                        $script.attr('src', element);
                        $script.text(data);
                        console.log({
                            $script: $script,
                            data: data
                        });
                        $('body').append($script);
                    }
                }, url.returnType));
            } else {
                if (typeof console !== 'undefined') {
                    console.error(element + ' not found');
                } else {
                    alert(element + ' not found');
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

$(document).on('ready', function () {

    app.loader({
        type: 'vendor',
        elements: ['underscore/underscore.min', 'backbone/backbone.min']
    }, function () {
        app.loader({
            type: 'views',
            elements: ['HomeView', 'ResumeView', 'ContactView', 'ShellView']
        }, function () {
            app.router = new app.Router();
            Backbone.history.start({
                // pushState: true
            });
        });
    });

});