/* eslint-disable no-undef */
import { generateRandomNumber } from '../utils'

let userInfo = {}
const existingUser = {
	email: 'steve1@gmail.com',
	password: '123',
}

const baseUrl = window.location.origin

const navigateFromSignInPageToSignUpPage = () =>
	cy
		.get('[data-cy=signup-text]')
		.should('exist')
		.click()

const navigateFromMainPageToFormEditorOfUserPage = () =>
	cy
		.get('[data-cy=user-page]')
		.should('exist')
		.click()
		.get('[data-cy=create-user-button')
		.should('exist')
		.click()

describe('Sign up', () => {
	beforeEach(() => {
		const randomUserName = `stevevo${generateRandomNumber(100, 1000000000000)}`
		userInfo = {
			email: `${randomUserName}@gmail.com`,
			name: `${randomUserName}`,
			password: '111',
			confirmPassword: '111',
		}

		cy.visit('/')
	})

	it('should allow users to register in sign up page', () => {
		navigateFromSignInPageToSignUpPage()
		cy.registerUser(
			userInfo.email,
			userInfo.name,
			userInfo.password,
			userInfo.confirmPassword
		)

		cy.url().should('equal', `${baseUrl}/sign-in`)
		cy.get('[data-cy=signin-button]').should('exist')
	})

	it('should not allow an existing user to register in sign up page', () => {
		navigateFromSignInPageToSignUpPage()
		cy.registerUser(
			existingUser.email,
			userInfo.name,
			userInfo.password,
			userInfo.confirmPassword
		)
		cy.url().should('equal', `${baseUrl}/sign-up`)
		cy.get('[data-cy=submit-button]').should('exist')
	})

	it('should allow users to register in user page', () => {
		cy.signIn(existingUser.email, existingUser.password)
		navigateFromMainPageToFormEditorOfUserPage()
		cy.registerUser(
			userInfo.email,
			userInfo.name,
			userInfo.password,
			userInfo.confirmPassword
		)
		cy.findAllByText(userInfo.email).should('exist')
		cy.findAllByText(userInfo.name).should('exist')
	})

	it('should not allow users to register in user page', () => {
		cy.signIn(existingUser.email, existingUser.password)
		navigateFromMainPageToFormEditorOfUserPage()
		cy.registerUser(
			existingUser.email,
			userInfo.name,
			userInfo.password,
			userInfo.confirmPassword
		)
		cy.on('window:alert', error => {
			expect(error.message).to.equal('GraphQL error: The email already exists.')
		})
	})
})
