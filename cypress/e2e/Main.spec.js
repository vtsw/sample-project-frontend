/* eslint-disable no-undef */
import { mockUser, mockMessageListOfUser } from '../../tests/shares/utils'
import { clickItemByTestId, mockMessage } from '../utils'

const selectUser = () =>
	cy
		.findAllByText(mockUser.email)
		.should('exist')
		.click()

describe('Sign up', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.signIn(mockUser.email, mockUser.password)
	})

	it('should show message list of user when select an user', () => {
		selectUser()

		cy.findByTestId('tableheader-lastModified').should('exist')
		cy.findByTestId('tableheader-content').should('exist')
	})

	it('should allow modifying a message', () => {
		const testId = `row-${mockMessageListOfUser[0].id}`

		selectUser()
		clickItemByTestId(testId)
		cy.findByPlaceholderText('placeholder')
			.focus()
			.clear()
			.type(mockMessage)
		clickItemByTestId('modifydialog-agreebutton')

		cy.findAllByText(mockMessage).should('exist')
	})

	it('should allow searching an existing user correctly', () => {
		cy.findByPlaceholderText('search...').type(mockUser.email)

		clickItemByTestId('search-icon')

		cy.findAllByText(mockUser.email).should('exist')
	})

	it('should allow deleting a message', () => {
		const messageTestId = `row-closeicon-${mockMessageListOfUser[1].id}`

		selectUser()
		clickItemByTestId(messageTestId)
		clickItemByTestId('deletedialog-agreebutton')

		cy.findByTestId(messageTestId).should('not.exist')
	})
})
