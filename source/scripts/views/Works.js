var 
	_ = require('underscore'),
	$ = require('jquery'),
	Backbone = require('backbone'),
	WorkView = require('./Work.js'),
	vent = require('../vent.js');

module.exports = Backbone.View.extend({

	ui: {},

	/** */
	initialize: function () {
		this.render();

		this.ui.$items = this.$('.Work');

		this.listenTo(vent, 'portfolio:filter', this.filterBy);

		vent.trigger('reflow');
	},

	/** */
	render: function () {
		var fragment = document.createDocumentFragment();
		
		_.each(this.collection.shuffle(), function (work) {
			fragment.appendChild(new WorkView({model: work}).el);
		}, this);

		this.$el.html(fragment);
	},

	/** */
	filterBy: function (tag) {
		var
			isFilteredClassName = 'Work--isFiltered';

		this.ui.$items.removeClass(isFilteredClassName);

		if (tag !== '*') {
			_.each(this.ui.$items, function (item) {
				var
					$item = $(item),
					tags = $item.attr('data-tags').split(/\s+/);

				if (tags.indexOf(tag) === -1) {
					$item.addClass(isFilteredClassName);
				}
			});
		}
	}
});