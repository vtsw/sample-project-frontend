/* eslint-disable no-undef */
import { generateRandomNumber } from '../utils'
import { Navigation } from './common'
const SignUpNav = Navigation.SignUp
let userInfo = {}
const existingUser = {
	email: 'steve1@gmail.com',
	password: '123',
}

const baseUrl = window.location.origin

function randomizeUserInfo() {
	const randomUserName = `stevevo${generateRandomNumber(100, 1000000000000)}`
	const userInfo = {
		email: `${randomUserName}@gmail.com`,
		name: `${randomUserName}`,
		password: '111',
		confirmPassword: '111',
	}
	return userInfo
}

describe('Sign up', () => {
	beforeEach(() => {
		userInfo = randomizeUserInfo()
		cy.visit('/')
	})

	it(
		'should allow users to register in sign up page',
		Navigation.withNavigation(
			SignUpNav.navigateFromSignInPageToSignUpPage,
			() => {
				cy.registerUser(userInfo)
				cy.url().should('equal', `${baseUrl}/sign-in`)
				cy.get('[data-testid=signin-button]').should('exist')
			}
		)
	)

	it('should not allow an existing user to register in sign up page', () => {
		SignUpNav.navigateFromSignInPageToSignUpPage()
		const tmpUser = { ...userInfo, email: existingUser.email }
		cy.registerUser(tmpUser)
		cy.url().should('equal', `${baseUrl}/sign-up`)
		cy.get('[data-testid=submit-button]').should('exist')
	})

	it('should allow users to register in user page', () => {
		cy.signIn(existingUser.email, existingUser.password)
		SignUpNav.navigateFromMainPageToFormEditorOfUserPage()
		cy.registerUser(userInfo)
		cy.findAllByText(userInfo.email).should('exist')
		cy.findAllByText(userInfo.name).should('exist')
	})

	it('should not allow users to register in user page', () => {
		cy.signIn(existingUser.email, existingUser.password)
		SignUpNav.navigateFromMainPageToFormEditorOfUserPage()
		const tmpUser = { ...userInfo, email: existingUser.email }
		cy.registerUser(tmpUser)
		cy.on('window:alert', error => {
			expect(error.message).to.equal('GraphQL error: The email already exists.')
		})
	})
})
