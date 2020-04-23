/* eslint-disable no-undef */
import { Navigation } from './common'
import { mockUserList, mockUser } from '../../tests/shares/utils'
import { clickRow } from '../utils'

const UserNav = Navigation.User

describe('Sign up', () => {
	let alertMessage = ''

	beforeEach(() => {
		cy.on('window:alert', msg => {
			alertMessage = msg
		})
		cy.visit('/')
		cy.signIn(mockUser.email, mockUser.password)
		UserNav.navigateFromMainPageTofUserPage()
	})

	afterEach(() => {
		alertMessage = ''
	})

	it('should allow updating users email', () => {
		clickRow(mockUserList, 11)
		cy.findByPlaceholderText('Email')
			.invoke('val')
			.then(value => {
				const newEmail = 'cy' + value
				cy.findByPlaceholderText('Email')
					.focus()
					.clear()
				cy.findByTestId('formeditor-email-input').type(newEmail)
				cy.findByTestId('formeditor-submit-button').click()
				cy.findAllByText(newEmail).should('exist')
			})
	})

	it('should not allow updating users email with invalid email', () => {
		const invalidEmail = 'ste@example.com'

		clickRow(mockUserList, 10)
		cy.findByPlaceholderText('Email')
			.focus()
			.clear()
		cy.findByTestId('formeditor-email-input').type(invalidEmail)
		cy.findByTestId('formeditor-submit-button')
			.click()
			.then(() => {
				expect(alertMessage).to.match(/Form is not valid!!!/)
			})
	})

	it('should allow updating users name', () => {
		clickRow(mockUserList, 11)
		cy.findByPlaceholderText('Name')
			.invoke('val')
			.then(value => {
				const newName = 'cy' + value
				cy.findByPlaceholderText('Name')
					.focus()
					.clear()
				cy.findByTestId('formeditor-name-input').type(newName)
				cy.findByTestId('formeditor-submit-button').click()
				cy.findAllByText(newName).should('exist')
			})
	})

	it('should not allow updating users name with invalid name', () => {
		const invalidName = ' '

		clickRow(mockUserList, 10)
		cy.findByPlaceholderText('Name')
			.focus()
			.clear()
		cy.findByTestId('formeditor-name-input').type(invalidName)
		cy.findByTestId('formeditor-submit-button')
			.click()
			.then(() => {
				expect(alertMessage).to.match(/Form is not valid!!!/)
			})
	})

	it('should allow updating users password', () => {
		clickRow(mockUserList, 13)
		cy.findByPlaceholderText('Password').type(mockUser.password)
		cy.findByPlaceholderText('Password Confirm').type(mockUser.password)
		cy.findByTestId('formeditor-submit-button')
			.click()
			.then(() => {
				expect(alertMessage).not.to.match(/Form is not valid!!!/)
				return
			})
	})

	it('should not allow updating users password with invalid password', () => {
		const invalidPassword = '11'
		clickRow(mockUserList, 10)
		cy.findByPlaceholderText('Password').type(invalidPassword)
		cy.findByPlaceholderText('Password Confirm').type(invalidPassword)
		cy.findByTestId('formeditor-submit-button')
			.click()
			.then(() => {
				expect(alertMessage).to.match(/Form is not valid!!!/)
			})
	})

	it('should not allow updating users password with different passwords', () => {
		const invalidPassword = '111'

		clickRow(mockUserList, 10)
		cy.findByPlaceholderText('Password').type(invalidPassword)
		cy.findByPlaceholderText('Password Confirm').type(invalidPassword + '1')
		cy.findByTestId('formeditor-submit-button')
			.click()
			.then(() => {
				expect(alertMessage).to.match(/Form is not valid!!!/)
			})
	})

	it('should allow searching an existing user correctly', () => {
		cy.findByPlaceholderText('search...').type(mockUser.email)
		cy.findByTestId('search-icon')
			.click()
			.then(() => {
				cy.findAllByText(mockUser.email).should('exist')
			})
	})

	it('should allow deleting an user', () => {
		clickRow(mockUserList, 10)
		cy.findByPlaceholderText('Email')
			.invoke('val')
			.then(email => {
				cy.findByTestId('formeditor-delete-button').click()
				cy.findByTestId('deletedialog-agreebutton')
					.click()
					.then(() => {
						cy.findAllByText(email).should('not.exist')
					})
			})
	})
})
