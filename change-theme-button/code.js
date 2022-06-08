(function change_theme_button() {
	const themes = {
		system: {name: 'system', icon: 'brightness_4', next: 'light'},
		light: {name: 'light', icon: 'brightness_5', next: 'dark'},
		dark: {name: 'dark', icon: 'brightness_2', next: 'custom'},
		custom: {name: 'custom', icon: 'settings', next: 'system'}
	}
	const current_theme = get_current_theme()
	const next_theme = get_next_theme()
	const header = document.querySelector('header')
	const title = header.querySelector('a')
	const btn = document.createElement('BUTTON')

	title.style.marginRight = '3rem'
	btn.className = 'header-icon material-icons'
	btn.innerText = next_theme.icon
	btn.onclick = toggle_theme
	btn.style.right = '0'
	header.appendChild(btn)

	function get_cookie(key) {
		if(document.cookie) {
			const cookies = document.cookie.split(';')
			for(const cookie of cookies) {
				const c = cookie.split('=')
				if(c[0].trim() == key) {
					return c[1]
					break
				}
			}
		}
		return false
	}
	function set_cookie(cookie_name, value, days=1000, path='/') {
		const expires = new Date((new Date).getTime() +
					 days * 24 * 3600 * 1000).toUTCString()
		const cookie = (`${cookie_name}=${value};` +
				`expires=${expires};path=${path}`)
		document.cookie = cookie
		return cookie
	}
	function set_theme(theme) {
		set_cookie('theme', theme.name)
		btn.innerText = 'sync'
		window.location.reload()
	}
	function get_current_theme() {
		const theme = get_cookie('theme')
		return theme in themes ? themes[theme] : themes.system
	}
	function get_next_theme() {
		return themes[current_theme.next]
	}
	function toggle_theme() {
		set_theme(next_theme)
	}
}());
