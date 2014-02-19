var 
	$ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	vent = require('../vent.js'),
	asConfigurable = require('../asConfigurable.js'),
	portfolioItemTpl = require('../templates/portfolioItem.js');

module.exports = Backbone.View.extend({

	template: _.template(portfolioItemTpl),

	events: {
		'click .PortfolioItem-close': 'close',
		'click .PortfolioItem-back': 'close'
	},

	initialize: function (options) {
		var that = this;

		asConfigurable.call(this, options);

		this.preload(this.options.data, function () {
			//console.log('Done!');
			//that.config.data.$images = $images;
			vent.trigger('portfolio:done');
			that.render();
		});
	},

	/** */
	render: function () {
		var compiled = this.template(this.options.data);

		this.setElement(compiled);
		this.$el.insertAfter($('.Page'));
		
		return this;
	},

	/** */
	preload: function (data, callback) {
		var 
			assets = data.assets,
			max = assets.length,
			i = 0,

			/** */
			increment = function () {
				/*if (e) {
					console.log(e.data.beingLoaded);
				}*/

				if ( (i += 1) === max ) {
					callback(data);
				}
			};

		_.each(assets, function (asset) {
			var $image;

			if (asset.type === 'image') {	
				$image = $('<img>').attr('src', asset.src);
				$image.on('load error', {beingLoaded: asset}, increment);
			} else {
				increment();
			}
		});
	},

	close: function () {
		vent.trigger('portfolio:close');
		this.remove();
		return false;
	}

	/*destroy: function () {
		vent.trigger('need:uncrop');
		vent.trigger('reflow', {forceSectionChange: true});
		this.undelegateEvents();
		this.$el.removeData().unbind();
		this.remove();
		Backbone.View.prototype.remove.call(this);
	}*/
});