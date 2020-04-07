/* eslint-disable no-undef */
import { generateRandomNumber } from '../utils'
import { Navigation } from './common'
const SignUpNav = Navigation.SignUp

const unregisteredUser = {
	email: 'unregistereduser999@gmail.com',
	password: 'steve12',
}

const baseUrl = window.location.origin
let registeredUser = {}

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

describe('Sign in', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should allow users to register in sign up page', () => {
		Navigation.navigateToSignUpPage()
		const randomUserInfo = randomizeUserInfo()
		cy.registerUser(randomUserInfo)
		registeredUser = randomUserInfo
		cy.url().should('equal', `${baseUrl}/sign-in`)
		cy.get('[data-cy=signin-button]').should('exist')
	})

	it('should allow a registered user to sign in', () => {
		Navigation.navigateToSignInPage()
		cy.signIn(registeredUser.email, registeredUser.password)
		cy.url().should('equal', `${baseUrl}/`)
		cy.findAllByText('main').should('exist')
	})

	it('should not allow an unregistered user to sign in', () => {
		cy.signIn(unregisteredUser.email, unregisteredUser.password)
		cy.url().should('equal', `${baseUrl}/sign-in`)
		cy.get('[data-cy=signin-button]').should('exist')
	})
})
