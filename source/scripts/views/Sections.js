var
	_ = require('underscore'),
	$ = require('jquery'),
	Backbone = require('backbone'),
	vent = require('../vent.js');

/** */
function getSectionSlug (str) {
	var re = /Section--([a-z\-]+)/i;
	return re.test(str) ? re.exec(str)[1] : str.replace(/\s+/, '-').toLowerCase();
}

/** */
function parseSection (section, index) {
	var
		$section = $(section),
		top = function () { return $section.offset().top; },
		height = function () { return $section.outerHeight(true); },
		bottom = function () { return top() + height(); },
		title = $section.find('.Section-title').text();

	return {
		id: section.id || getSectionSlug(section.className),
		top: top,
		bottom: bottom,
		title: title,
		index: index
	};
}

/** */
function parseSections(sections) {
	var retval = [];

	_.each(sections, function (section, i) {
		retval.push(parseSection(section, i));
	});

	return retval;
}

module.exports = Backbone.View.extend({

	ui: {},
	states: {},
	cached: {},

	/** */
	initialize: function (config) {
		_.bindAll(this, 'update');

		this.config = config || {};
		this.config.offsetY = config.offsetY;
		
		/** */
		this.listenTo(vent, 'section:change', function (data) {
			/**
			 * If we are not in a defined section, scroll to top of the page
			 */
			if (!data.id && !this.isPaused()) {
				this.scrollTo();
			}
		});

		this.populate();

		$(window).on('resize scroll', _.debounce(this.update, 50));
		this.listenTo(vent, 'reflow', this.update);
		this.listenTo(vent, 'section:scroll', this.scrollTo);
	},

	/** */
	populate: function () {
		this.ui.$sections = $('.Section:not([data-skip])');

		this.cached.parsedSections = parseSections(this.ui.$sections);

		return this;
	},

	/** */
	update: function () {
		var
			previousSection = this.states.currentSection;

		if (!this.isPaused()) {
			this.states.currentSection = this.current();

			if (!previousSection || this.states.currentSection.id !== previousSection.id) {
				vent.trigger('section:change', this.states.currentSection);
			}
		}

		return this;
	},

	/** */
	offsetY: function () {
		var retval;

		if (_.isFunction(this.config.offsetY)) {
			retval = this.config.offsetY();
		}

		return _.isNumber(retval) ? retval : 0;
	},

	/** */
	current: function () {
		var
			scrollY = window.scrollY || window.pageYOffset,
			offsetY = this.offsetY();

		var foo = _.find(this.cached.parsedSections, function (section) {
			return scrollY >= section.top() - offsetY && scrollY < section.bottom() - offsetY;
		}) || {};

		return foo;
	},

	/** */
	all: function () {
		return this.cached.parsedSections;
	},

	/** */
	scrollTo: function (id, offsetY, callback) {
		var 
			section = _.findWhere(this.cached.parsedSections, {id: id});

		if (offsetY === true) {
			offsetY = this.offsetY();
		} else if (!_.isNumber(offsetY)) {
			offsetY = 0;
		}

		$('html,body').stop().animate({
			scrollTop: (section && section.top() - offsetY + 5) || 0
			//scrollTop: (section && section.top()) || 0
		}, function () {
			if (callback && _.isFunction(callback)) {
				callback();
			}
		});
	},

	/** */
	pause: function () {
		this.states.isPaused = true;
	},

	/** */
	resume: function () {
		this.states.isPaused = false;
	},

	/** */
	isPaused: function () {
		return this.states.isPaused;
	}

});