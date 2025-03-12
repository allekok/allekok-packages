(function auto_scroll() {
	let timeout = 60
	let step = 1
	window.allekok_scroll_int = 0
	
	let old_ajax_load

	window.addEventListener('load', () => {
		old_ajax_load = ajax_load
		ajax_load = new_ajax_load

		auto_scroll()
	})

	function new_ajax_load(url, href, content, parent, target, loading) {
		old_ajax_load(url, href, content, parent, target, loading)
		auto_scroll()
	}
	function auto_scroll() {
		const poem_el = document.querySelector('article#hon')
		if(window.allekok_scroll_int) {
			clearInterval(window.allekok_scroll_int)
			window.allekok_scroll_int = 0
		}
		if(poem_el)
			scroll()
	}
	function scroll() {
		const max = document.body.scrollHeight - window.innerHeight - 5
		const current = () => window.scrollY
		window.allekok_scroll_int = setInterval(() => {
			if(current() < max) {
				window.scrollTo(window.scrollX,
						current() + step)
			} else {
				clearInterval(window.allekok_scroll_int)
			}
		}, timeout)
	}
}());
