const AUTH_TOKEN = 'AUTH_TOKEN'

const getToken = () => localStorage.getItem(AUTH_TOKEN)
const setToken = token => localStorage.setItem(AUTH_TOKEN, token)
const deleteToken = () => localStorage.removeItem(AUTH_TOKEN)

export { getToken, setToken, deleteToken }
