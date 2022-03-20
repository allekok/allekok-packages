(function transliterate() {
	window.addEventListener('load', on_load)
	ajax_load = new_ajax_load
	apply_style()

	function transliterate_fn(w) {
		return transliterate_ar2lat(w)
	}
	function new_ajax_load(url, href, content, parent, target, loading) {
		const t = document.querySelector(target)
		window.history.pushState({url: url}, '', href)
		window.scrollTo(0, 0)
		t.outerHTML = content
		apply_to_text(document.querySelector(target), transliterate_fn)
		eval_js(content)
		ajax(parent, target)
		loading.style.display = 'none'
	}
	function on_load() {
		apply_to_text(document.body, transliterate_fn)
		ajax()
		document.getElementById('tS').addEventListener(
			'click', toggle_search)
		document.getElementById('tL').addEventListener(
			'click', toggle_Like)
	}
	function apply_style() {
		const html = document.querySelector('html')
		const header = document.querySelector('header')
		html.dir = 'ltr'
		header.style.textAlign = 'center'
	}
}());
