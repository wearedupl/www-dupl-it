var
	$ = require('jquery'),
	Backbone = require('backbone'),
	vent = require('../vent.js'),
	SectionsView = require('./Sections.js'),
	NavMainView = require('./NavMain.js'),
	CritterView = require('./Critter.js'),
	PortfolioCollection = require('../collections/Portfolio.js'),
	WorksView = require('./Works.js'),
	NavTagsView = require('./NavTags.js'),
	OverlayView = require('./Overlay.js'),
	PortfolioItemView = require('./PortfolioItem.js');

module.exports = Backbone.View.extend({

	ui: {},
	collections: {},
	states: {},

	/** */
	initialize: function () {
		this.collections.portfolio = new PortfolioCollection();

		/** */
		this.ui.critterView = new CritterView({
			parent: this.$('.Section--hello')
		});

		/** */
		this.ui.worksView = new WorksView({
			el: this.$('.Works'),
			collection: this.collections.portfolio
		});

		/** */
		this.ui.navTagsView = new NavTagsView({
			parent: this.ui.worksView.el,
			collection: this.collections.portfolio
		});

		/** */
		this.ui.sectionsView = new SectionsView({
			el: this.el,
			
			offsetY: function () {
				return $('.NavMain-items').height();
			}
		});

		/** */
		this.listenTo(vent, 'navigation:toggle', function (isToggled) {
			var 
				scrollY = window.scrollY || window.pageYOffset,
				offsetY = $('.NavMain-items').height(),
				top = isToggled ? scrollY - offsetY + 5: scrollY + offsetY - 5;

			if (scrollY > offsetY) {
				$('html,body').stop().animate({
					scrollTop: top
				});
			}
		});

		/** */
		this.ui.navMainView = new NavMainView({
			sections: this.ui.sectionsView.all(),
			parent: this.el
		});

		/**
		 * Fire a section:change event
		 *
		 * If we need to listen to a section:change event during
		 * the page load, we need to define listeners
		 * before this got called
		 */
		this.ui.sectionsView.update();

		/** */
		this.listenTo(vent, 'portfolio:route', function (slug) {
			var portfolioItem = this.collections.portfolio.findWhere({slug: slug});
			
			if (portfolioItem) {
				vent.trigger('portfolio:item', portfolioItem.toJSON());
			} else {
				Backbone.history.navigate('', {replace: true});	
			}
		});

		/** */
		this.listenTo(vent, 'portfolio:item', function (data) {
			Backbone.history.navigate('portfolio/' + data.slug, {replace: true});
			document.title = 'Dupl | ' + data.name;
			this.crop();
			this.ui.overlayView = new OverlayView({parent: this.el});
			this.ui.portfolioItemView = new PortfolioItemView({data: data});
		});

		/** */
		this.listenTo(vent, 'portfolio:done', function () {
			this.ui.overlayView.remove();
		});

		/** */
		this.listenTo(vent, 'portfolio:close', function () {
			Backbone.history.navigate('', {replace: true});
			document.title = 'Dupl';
			this.uncrop();
		});
	},

	/** */
	crop: function () {
		var scrollTop = $(window).scrollTop();

		this.ui.sectionsView.pause();
		this.$el.addClass('Page--isCropped');
		this.$el.scrollTop(scrollTop);
		this.states.scrollTop = scrollTop;
	},

	/** */
	uncrop: function () {
		this.$el.removeClass('Page--isCropped');
		$('html,body').scrollTop(this.states.scrollTop);
		this.ui.sectionsView.resume();
	}
});