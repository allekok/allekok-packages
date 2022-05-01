(function justify_poems() {
	ajax_load = new_ajax_load
	justify_poem()

	function new_ajax_load(url, href, content, parent, target, loading) {
		const t = document.querySelector(target)
		window.history.pushState({url: url}, '', href)
		window.scrollTo(0, 0)
		t.outerHTML = content
		eval_js(content)
		justify_poem()
		ajax(parent, target)
		loading.style.display = 'none'
	}
	function justify_poem() {
		const poem_el = document.getElementById('hon')
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
		if(!spaces)
			return str
		const tokens = str.split(/( +)/)
		if(tokens.length < 2)
			return str
		while(spaces > 0)
			for(let i = 1; i < tokens.length && spaces--; i += 2)
				tokens[i] += ' '
		return tokens.join('')
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
