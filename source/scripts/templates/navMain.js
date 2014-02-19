module.exports = [
	
	'<nav class="NavMain">',
		'<ul class="NavMain-items">',
		'<% _.each(sections, function (section) { %>',
			'<li class="NavMain-item"><a href="#<%= section.id %>"><%= section.title %></a></li>',
		'<% }) %>',
		'</ul>',
		'<a href="#" class="NavMain-toggle"><i></i><i>Menu</i><i></i></a>',
	'</nav>'
	
].join('\n');