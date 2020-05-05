/* eslint-disable no-undef */
import {
	mockUser,
	mockMessageListOfUser,
	mockMessageList,
} from '../../tests/shares/utils'
import { Navigation } from './common'
import { clickItemByTestId, mockMessage } from '../utils'

const MessageNav = Navigation.Message
const mockNewMessage = 'mocknewmessage'

describe('Sign up', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.signIn(mockUser.email, mockUser.password)
		MessageNav.navigateFromMainPageTofMessagePage()
	})

	it('should allow creating message correctly', () => {
		cy.findByPlaceholderText('text...').type(mockNewMessage)

		cy.findAllByTestId('actioninputbox-button')
			.eq(0)
			.should('exist')
			.click()

		cy.findAllByText(mockNewMessage).should('exist')
	})

	it('should allow searching an existing message correctly', () => {
		cy.findByPlaceholderText('search...').type(mockNewMessage)

		clickItemByTestId('search-icon')

		cy.findAllByText(mockNewMessage).should('exist')
	})

	it('should allow modifying a message', () => {
		const testId = `row-${mockMessageList[4].id}`

		clickItemByTestId(testId)
		cy.findByPlaceholderText('placeholder')
			.focus()
			.clear()
			.type(mockMessage)
		clickItemByTestId('modifydialog-agreebutton')

		cy.findByTestId(testId).contains(mockMessage)
	})

	it('should allow deleting a message', () => {
		const messageTestId = `row-closeicon-${mockMessageListOfUser[2].id}`

		clickItemByTestId(messageTestId)
		clickItemByTestId('deletedialog-agreebutton')

		cy.findByTestId(messageTestId).should('not.exist')
	})
})
