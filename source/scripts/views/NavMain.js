var
	//$ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	vent = require('../vent.js'),
	navMainTpl = require('../templates/navMain.js');

module.exports = Backbone.View.extend({

	template: _.template(navMainTpl),

	ui: {},

	states: {
		isToggled: true,
	},

	events: {
		'click .NavMain-item': 'onClick',
		'click .NavMain-toggle': 'onToggleClick'
	},

	/** */
	initialize: function (config) {
		_.bindAll(this, 'onSectionChange');

		this.listenTo(vent, 'section:change', this.onSectionChange);

		//$(window).on('scroll', _.debounce(this.onScroll, 50, true));

		this.config = config || {};
		this.render();

		/** */
		this.toggle(this.states.isToggled);

		this.ui.$toggle = this.$('.NavMain-toggle');
		this.ui.$items = this.$('.NavMain-item');
	},

	/** */
	render: function () {
		var 
			compiled = this.template({sections: this.config.sections});

		this.setElement(compiled);
		this.$el.prependTo(this.config.parent);
		
		return this;
	},

	/** */
	height: function () {
		return this.$('.NavMain-items').height();
	},

	/** */
	onToggleClick: function () {
		/*var 
			that = this,
			callback = function () {
				that.states.hasScrolled = false;
			};*/

		this.toggle(!this.isToggled());

		/*if (!this.isToggled() && !this.hasScrolled()) {
			vent.trigger('section:scroll', this.states.currentSectionID, false, callback);
		} else if (this.isToggled() && !this.hasScrolled()) {
			vent.trigger('section:scroll', this.states.currentSectionID, true, callback);
		}*/

		return false;
	},

	/** */
	onClick: function (e) {
		var 
			href = e.target.href,
			id = href.substr(href.lastIndexOf('#') + 1);
		
		vent.trigger('section:scroll', id, true);

		return false;
	},

	/** */
	onSectionChange: function (currentSection) {
		var isAltClassName = 'NavMain-toggle--isAlt';

		if (currentSection.index === 0) {
			this.ui.$toggle.addClass(isAltClassName);
		} else {
			this.ui.$toggle.removeClass(isAltClassName);
		}

		this.setCurrentItem(currentSection.id);
	},

	/** */
	toggle: function (isToggled) {
		var isToggledClassName = 'NavMain--isToggled';

		if (isToggled) {
			this.$el.addClass(isToggledClassName);
			this.states.isToggled = true;
		} else {
			this.$el.removeClass(isToggledClassName);
			this.states.isToggled = false;
		}

		vent.trigger('navigation:toggle', isToggled);
	},

	/** */
	isToggled: function () {
		return this.states.isToggled;
	},

	/** */
	setCurrentItem: function (id) {
		var 
			isCurrentClassName = 'NavMain-item--isCurrent',
			$item;

		this.ui.$items.removeClass(isCurrentClassName);

		if (id) {
			$item = this.ui.$items
				.find('a[href^="#' + id + '"]')
				.parent()
				.addClass(isCurrentClassName);
		}
	},
});