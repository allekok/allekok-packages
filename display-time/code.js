(function display_time() {
	const header = document.querySelector('header')
	const div = document.createElement('DIV')
	const clock = setInterval(display, 1000)

	header.appendChild(div)
	div.style = ('font-size:1.1rem;' +
		     'position:fixed;' +
		     'top:0;' +
		     'left:0;' +
		     'padding:0 .5rem;' +
		     'background:rgba(128, 128, 128, .3)')
	display()

	function display() {
		div.innerText = get_current()
	}
	function get_current() {
		const now = new Date,
		      time = ckb_num(now.toLocaleTimeString('per'))
		return time
	}
	function ckb_num(s) {
		const f = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g,
			   /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
		const t = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

		for(const i in f)
			s = s.replace(f[i], t[i])

		return s
	}
}());
