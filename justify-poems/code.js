(function justify_poems() {
	let old_ajax_load

	window.addEventListener('load', () => {
		old_ajax_load = ajax_load
		ajax_load = new_ajax_load

		justify_poem()
	})

	function new_ajax_load(url, href, content, parent, target, loading) {
		old_ajax_load(url, href, content, parent, target, loading)
		justify_poem()
	}
	function justify_poem() {
		const poem_el = document.querySelector('article#hon')
		if(poem_el)
			with_test_element(poem_el, justify)
	}
	function justify(poem_el, test_el) {
		const widths = get_lines_width(poem_el, test_el)
		const space_width = calc_space_width(test_el)
		if(widths)
			apply_to_text(poem_el, fill(widths, space_width))
	}
	function with_test_element(parent_el, proc) {
		const test_el = document.createElement('DIV')
		test_el.className = 'b'
		test_el.style = 'display:inline;padding:0;white-space:pre'
		parent_el.parentElement.appendChild(test_el)
		proc(parent_el, test_el)
		parent_el.parentElement.removeChild(test_el)
	}
	function fill(widths, space_width) {
		const max_width = get_max(widths)
		return line => {
			const width = widths.shift()
			const spaces = calc_required_spaces(width,
							    max_width,
							    space_width)
			return add_html(insert_spaces(line, spaces))
		}
	}
	function add_html(str) {
		return `<span style="white-space:pre">${str}</span>\n`
	}
	function insert_spaces(str, spaces) {
		if(str.indexOf(' ') == -1)
			return str
		while(spaces) {
			let new_str = ''
			for(const c of str) {
				if(c == ' ' && spaces) {
					new_str += ' '
					spaces--
				}
				new_str += c
			}
			str = new_str
		}
		return str
	}
	function calc_required_spaces(width, max_width, space_width) {
		return Math.round((max_width - width) / space_width)
	}
	function calc_width(test_el) {
		return str => {
			test_el.innerText = str
			return test_el.offsetWidth
		}
	}
	function calc_space_width(test_el, space=' ') {
		return calc_width(test_el)(space)
	}
	function get_lines_width(source_el, test_el) {
		return map_text_nodes(source_el, calc_width(test_el))
	}
	function get_max(items_array) {
		return Math.max(...items_array)
	}
	function exclude(el) {
		const elements = ['SUP']
		const classes = ['material-icons', 'm', 'n']

		if(elements.indexOf(el.nodeName) != -1)
			return true
		for(c of el.classList)
			if(classes.indexOf(c) != -1)
				return true
		return false
	}
	function apply_to_text(el, proc) {
		let html = ''
		for(const o of el.childNodes) {
			if(o.nodeName == '#text') {
				if(exclude(o.parentElement))
					html += o.data
				else {
					const d = o.data.trim()
					html += d ? proc(d) : d
				}
			}
			else {
				apply_to_text(o, proc)
				if(o.outerHTML !== undefined)
					html += o.outerHTML
			}
		}
		el.innerHTML = html
	}
	function map_text_nodes(el, proc) {
		function loop(el) {
			for(const o of el.childNodes) {
				if(o.nodeName == '#text') {
					if(exclude(o.parentElement))
						continue
					const d = o.data.trim()
					if(d)
						res.push(proc(d))
				}
				else
					loop(o)
			}
		}
		const res = []
		loop(el)
		return res
	}
}());
