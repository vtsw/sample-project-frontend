/* eslint-disable no-undef */
import { Navigation } from './common'
import { mockUserList, mockUser } from '../../tests/shares/utils'
import { clickItemByTestId } from '../utils'

const UserNav = Navigation.User

describe('Sign up', () => {
	let alertMessage = ''
	const testId = `row-${mockUserList[11].id}`

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
		clickItemByTestId(testId)
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

		clickItemByTestId(testId)
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
		clickItemByTestId(testId)
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

		clickItemByTestId(testId)
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
		clickItemByTestId(testId)
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
		clickItemByTestId(testId)
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

		clickItemByTestId(testId)
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
		// change rowIndex of clickItemByTestId after each test
		// Because cy can not find this row when it's deleted
		const testId = `row-${mockUserList[13].id}`

		clickRow(testId)
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
