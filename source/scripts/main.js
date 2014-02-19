var
	Backbone = require('backbone'),
	AppView = require('./views/App.js'),
	Workspace = require('./routers/Workspace.js');

Backbone.$ = require('jquery');

new AppView({
	el: '.Page'
});

new Workspace();
Backbone.history.start({pushState: true, root: '/'});