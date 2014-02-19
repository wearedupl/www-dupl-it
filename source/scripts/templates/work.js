module.exports = [

	'<div class="Work" data-tags="<%= tags.join(" ") %>" id="<%= slug %>">',
		'<a href="/portfolio/<%= slug %>" class="Work-url">',
			'<h3 class="Work-name"><%= name %></h3>',
			'<img src="<%= thumb.src %>" class="Work-image">',
		'</a>',
	'</div>'

].join('\n');