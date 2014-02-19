var 
	_ = require('underscore'),
	Backbone = require('backbone'),
	critterTpl = require('../templates/critter.js'),

	crittersMap = [
		{name: 'parrot', says: 'heeello'},
		{name: 'elephant', says: 'baaar'},
		{name: 'donkey', says: 'i-ooo'},
		{name: 'cat', says: 'miaaao'},
		{name: 'bull', says: 'sbufff'},
		{name: 'mouse', says: 'squit'},
		{name: 'rabbit', says: 'tump'},
		{name: 'deer', says: 'bhooo?'},
		{name: 'squirrel', says: 'gniiic'},
		{name: 'dragon', says: 'roarrr'}
	];

module.exports = Backbone.View.extend({
	
	template: _.template(critterTpl),

	/** */
	initialize: function (config) {

		this.config = config || {};
		this.render();
	},

	/** */
	render: function () {
		var
			max = crittersMap.length,
			index = Math.floor(Math.random() * max),
			critter = crittersMap[index];
		
		this.setElement(this.template(critter));
		this.$el.appendTo(this.config.parent);
	}
});