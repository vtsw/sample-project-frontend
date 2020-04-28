/* eslint-disable no-undef */

import { mockUser, mockMessageListOfUser } from '../../tests/shares/utils'
import { clickRow } from '../utils'

const mockMessage = 'mockmessage'

const selectUser = () =>
	cy
		.findAllByText(mockUser.email)
		.should('exist')
		.click()

const clickItemByTestId = testId =>
	cy
		.findByTestId(testId)
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
		selectUser()
		clickRow(mockMessageListOfUser, 1)
		cy.findByPlaceholderText('placeholder')
			.focus()
			.clear()
			.type(mockMessage)
		clickItemByTestId('modifydialog-agreebutton')

		cy.findAllByText(mockMessage).should('exist')
	})

	it('should allow deleting a message', () => {
		const messageTestId = `row-closeicon-${mockMessageListOfUser[1].id}`

		selectUser()
		clickItemByTestId(messageTestId)
		clickItemByTestId('deletedialog-agreebutton')

		cy.findByTestId(messageTestId).should('not.exist')
	})

	it('should allow searching an existing user correctly', () => {
		cy.findByPlaceholderText('search...').type(mockUser.email)

		clickItemByTestId('search-icon')

		cy.findAllByText(mockUser.email).should('exist')
	})
})
