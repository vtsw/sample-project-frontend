const AUTH_TOKEN = 'AUTH_TOKEN'

const getToken = () => localStorage.getItem(AUTH_TOKEN)
const setToken = token => localStorage.setItem(AUTH_TOKEN, token)
const deleteToken = () => localStorage.removeItem(AUTH_TOKEN)

const validateEmail = email => {
	const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm
	return email.match(emailRegex)
}

const validatePassword = password => {
	return password.length >= 3 && password.length <= 25
}

export { getToken, setToken, deleteToken, validateEmail, validatePassword }
