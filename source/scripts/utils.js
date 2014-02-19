module.exports = {
	
	/** */
	getScrollbarWidth: function () {
		var 
			body = document.body,
			width;

		body.style.overflow = 'hidden';
		width = body.clientWidth;

		body.style.overflow = 'scroll';
		width -= body.clientWidth;

		body.style.overflow = '';

		return width;
	}

};