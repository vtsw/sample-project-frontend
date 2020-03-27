import { generateRandomNumber } from '../utils'

const randomUserName = `steve${generateRandomNumber(10000000, 1000000000000)}`
const userInfo = {
	email: `${randomUserName}@gmail.com`,
	name: `${randomUserName}`,
	password: 'steve12',
	confirmPassword: 'steve12',
}
const existingUser = {
	email: 'steve1@gmail.com',
	password: '123',
}

const baseUrl = window.location.origin

describe('Sign up', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should allow users to register', () => {
		cy.get('[data-cy=signup-text]')
			.should('exist')
			.click()
			.get('[type=email]')
			.type(userInfo.email)
			.get('[type=text]')
			.type(userInfo.name)
			.get('#formeditor-password')
			.type(userInfo.password)
			.get('#formeditor-password-confirm')
			.type(userInfo.confirmPassword)
		cy.get('[data-cy=submit-button]')
			.click()
			.url()
			.should('equal', `${baseUrl}/sign-in`)
		cy.get('[data-cy=signin-button]').should('exist')
	})

	it('should not allow an existing user to register', () => {
		cy.get('[data-cy=signup-text]')
			.should('exist')
			.click()
			.get('[type=email]')
			.type(existingUser.email)
			.get('[type=text]')
			.type(userInfo.name)
			.get('#formeditor-password')
			.type(existingUser.password)
			.get('#formeditor-password-confirm')
			.type(existingUser.password)
		cy.get('[data-cy=submit-button]')
			.click()
			.url()
			.should('equal', `${baseUrl}/sign-up`)
		cy.get('[data-cy=submit-button]').should('exist')
		cy.log('Email already exists')
	})
})
