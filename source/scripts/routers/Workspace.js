var 
	Backbone = require('backbone'),
	vent = require('../vent.js');

module.exports = Backbone.Router.extend({
	routes: {
		'portfolio/:slug': 'getPortfolioItem',
		'*other': 'index'
	},

	getPortfolioItem: function (slug) {
		vent.trigger('portfolio:route', slug);
	},

	index: function () {
		//Backbone.history.navigate('');
	}
});