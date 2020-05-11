/* eslint-disable no-undef */
const generateRandomNumber = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

const clickItemByTestId = testId =>
	cy
		.findByTestId(testId)
		.should('exist')
		.click()

const mockMessage = 'mockmessage'

export { generateRandomNumber, clickItemByTestId, mockMessage }
