(function allekok_colorful_theme() {
	const poets = document.querySelectorAll('.poet')
	const style = document.createElement('STYLE')
	let s = `.poet { ` +
	    `border-radius:.2rem;` +
	    `max-width:100px;` +
	    `margin:1%;` +
	    `width:23%` +
	    ` } ` +
	    `.poet img { ` +
	    `border-radius:.2rem .2rem 0 0;width:100%;background:#EEE` +
	    ` } ` +
	    `.poet h3 { ` +
	    `text-shadow:1px 0 1px #FFF` +
	    ` } `
	let i = 1

	poets.forEach(p => {
		s += (`.poet:nth-child(${i++}) { ` +
		      `background:${random_color()}` +
		      ` } `)
	})

	style.innerHTML = s
	document.head.appendChild(style)

	function random_color() {
		const colors = ['#FFCBCB', '#E7FBBE', '#FFFDDE',
				'#D9D7F1', '#FFBED8', '#EDD2F3',
				'#FEE3EC',  '#F9C5D5', '#FFFEA9',
				'#D7E9F7']
		return colors[Math.floor(Math.random() * colors.length)]
	}
})()
