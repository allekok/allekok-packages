(function no_images() {
	const style = document.createElement('STYLE')
	style.innerHTML = ('img { display:none !important }' +
			   '#poets div:first-child a.material-icons { ' +
			   'display:none !important }')
	document.head.appendChild(style)
})()
