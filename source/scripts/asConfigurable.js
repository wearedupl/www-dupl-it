var _ = require('underscore');

module.exports = function (options) {
	options || (options = {});
	this.options || (this.options = {});

	_.extend(this.options, _.omit(options, [
		'model',
		'collection',
		'el',
		'id',
		'attributes',
		'className',
		'tagName',
		'events'
	]));

	return this;
};