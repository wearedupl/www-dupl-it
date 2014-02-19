var 
	_ = require('underscore'),
	$ = require('jquery'),
	Backbone = require('backbone'),
	vent = require('../vent.js'),
	navTagsTpl = require('../templates/navTags.js');

module.exports = Backbone.View.extend({

	template: _.template(navTagsTpl),

	ui: {},

	events: {
		'click .NavTags-item': 'onClick'
	},

	/** */
	initialize: function (config) {

		/** Configuration */
		this.config = config || {};

		this.render();
		
		this.ui.$items = this.$('.NavTags-item');
	},

	onClick: function (e) {
		var 
			el = e.currentTarget,
			$el = $(el),
			tag = $el.attr('data-tag') || '*',
			isCurrentClassName = 'NavTags-item--isCurrent';

		this.ui.$items.removeClass(isCurrentClassName);
		$el.addClass(isCurrentClassName);

		vent.trigger('portfolio:filter', tag);
		vent.trigger('reflow');

		return false;
	},

	render: function () {
		var compiled = this.template({tags: this.collection.tags()});

		this.setElement(compiled);

		this.$el.prependTo(this.config.parent);

		return this;
	}
});