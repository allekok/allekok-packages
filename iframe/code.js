(function iframe() {
	const url = 'https://books.vejin.net/'
	const iframe = document.createElement('IFRAME')
	const iframe_style = ('width:48%;height:100%;display:inline-block;' +
			      'box-sizing:border-box;border:1px solid;' +
			      'vertical-align:top;margin-left:2%;' +
			      'border-radius:1rem;')
	const main_id = 'MAIN'
	const main_style = 'width:50%;display:inline-block'

	let old_ajax_load

	window.addEventListener('load', () => {
		const main = document.getElementById(main_id)

		old_ajax_load = ajax_load
		ajax_load = new_ajax_load

		iframe.src = url
		iframe.style = iframe_style
		document.body.insertBefore(iframe, main)

		set_main_style(main)
		resize()
	})

	function new_ajax_load(url, href, content, parent, target, loading) {
		old_ajax_load(url, href, content, parent, target, loading)
		const main = document.getElementById(main_id)
		set_main_style(main)
	}
	function resize(interval=1000) {
		return setInterval(() => {
			const main = document.getElementById(main_id)
			iframe.style.height = `${main.offsetHeight}px`
		}, interval)
	}
	function set_main_style(main) {
		main.style = main_style
	}
}());
