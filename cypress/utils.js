const generateRandomNumber = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

const existingUser = {
	email: 'steve1@gmail.com',
	password: '123',
}

export { generateRandomNumber, existingUser }
