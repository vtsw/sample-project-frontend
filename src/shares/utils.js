const AUTH_TOKEN = 'AUTH_TOKEN'

const getToken = () => localStorage.getItem(AUTH_TOKEN)
const setToken = token => localStorage.setItem(AUTH_TOKEN, token)
const deleteToken = () => localStorage.removeItem(AUTH_TOKEN)

const validateEmail = email => {
	const emailRegex = /^[a-z][a-z0-9_\.]{4,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm
	return email.match(emailRegex)
}

const validateName = name => {
	const nameRegex = /^[a-zA-Z0-9]{3,30}$/
	return name.match(nameRegex)
}

const validatePassword = password => {
	const passwordRegex = /^[a-zA-Z0-9]{3,}$/
	return password.match(passwordRegex)
}

export {
	getToken,
	setToken,
	deleteToken,
	validateEmail,
	validateName,
	validatePassword,
}
