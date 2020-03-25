import { generateRandomNumber } from '../utils'

const randomUserName = `steve${generateRandomNumber(1, 10000000)}`

describe('Sign up', () => {
	const userInfo = {
		email: `${randomUserName}@gmail.com`,
		name: `${randomUserName}`,
		password: 'steve12',
		confirmPassword: 'steve12',
	}

	beforeEach(() => {
		cy.visit('/')
	})

	it('should navigate to sign up page', () => {
		cy.findAllByText('sign up')
			.should('exist')
			.click()
	})

	it('should allow users to register', () => {
		cy.get('[type=email]')
			.type(userInfo.email)
			.get('[type=text]')
			.type(userInfo.name)
			.get('#formeditor-password')
			.type(userInfo.password)
			.get('#formeditor-password-confirm')
			.type(userInfo.confirmPassword)
		cy.findAllByText('Register')
			.click()
			.url()
			.should('equal', `${window.location.origin}/sign-in`)
		cy.findAllByText('Sign in').should('exist')
	})
})
