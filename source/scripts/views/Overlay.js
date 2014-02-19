var 
	_ = require('underscore'),
	Backbone = require('Backbone'),
	overlayTpl = require('../templates/overlay.js');

module.exports = Backbone.View.extend({

	template: _.template(overlayTpl),

	ui: {},

	/** */
	initialize: function (config) {
		this.config = config || {};
		this.config.parent = config.parent;

		this.render();

		this.ui.$close = this.$('.Overlay-close');
		this.ui.$text = this.$('.Text');
	},

	render: function () {
		this.setElement(this.template());
		this.$el.appendTo(this.config.parent);

		return this;
	},

	text: function (str) {
		this.ui.$text.html(str);
		
		return this;
	},

	close: function () {
		this.undelegateEvents();
		this.$el.removeData().unbind();
		this.remove();
		Backbone.View.prototype.remove.call(this);
	}
});