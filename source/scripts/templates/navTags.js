module.exports = [

	'<nav class="NavTags">',
		'<ul class="NavTags-items">',
			'<li class="NavTags-item NavTags-item--isCurrent" data-tag="*"><a href="#">Tutto</a></li>',
			'<% _.each(tags, function (tag) { %>',
			'<li class="NavTags-item" data-tag="<%= tag %>"><a href="#"><%= tag %></a></li>',
			'<% }) %>',
		'</ul>',
	'</nav>'

].join('\n');