var
	_ = require('underscore'),
	Backbone = require('backbone'),
	PortfolioItem = require('../models/PortfolioItem.js'),
	worksList = require('../worksList.js');

/** */
function createSlug (str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

/** */
function parseWorks (worksList) {
	var retval = [];

	_.each(worksList, function (work) {
		var assets = [];

		work.slug = createSlug(work.name);
		
		_.each(work.assets, function (asset) {
			assets.push({
				src: asset.src || asset,
				caption: asset.caption || '',
				type: asset.type || 'image'
			});
		});

		work.thumb = assets.shift();
		work.assets = assets;

		if (work.assets.length > 1) {
			retval.push(work);
		}
	});

	return retval;
}

module.exports = Backbone.Collection.extend({
	
	model: PortfolioItem,

	/** */
	initialize: function () {
		this.reset(parseWorks(worksList));
	},

	/** */
	tags: function () {
		return _.sortBy(_.uniq(_.flatten(this.pluck('tags'))), _.identity);
	}
});