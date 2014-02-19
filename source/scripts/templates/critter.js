module.exports = [

	'<div class="Critter Critter--<%= name %>">',
		'<div class="Critter-says">',
			'<span><%= says %></span>',
		'</div>',
	'</div>'

].join('\n');