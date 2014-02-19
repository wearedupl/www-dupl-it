var 
	_ = require('underscore'),
	Backbone = require('backbone'),
	vent = require('../vent.js'),
	workTpl = require('../templates/work.js');

module.exports = Backbone.View.extend({
		template: _.template(workTpl),

		events: {
			'click .Work-url': 'click'
		},

		/** */
		initialize: function () {
			this.render();
		},

		/** */
		render: function () {
			var compiled =  this.template(this.model.toJSON());
			
			this.setElement(compiled);
			return this;
		},

		/** */
		click: function () {
			if (!this.$el.hasClass('Work--isFiltered')) {
				vent.trigger('portfolio:item', this.model.toJSON());	
			}

			return false;
		}
	});