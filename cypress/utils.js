/* eslint-disable no-undef */
const generateRandomNumber = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

const clickRow = (listItem, rowIndex) =>
	cy
		.get(`[data-testid=row-${listItem[rowIndex].id}]`)
		.should('exist')
		.click()

export { generateRandomNumber, clickRow }
