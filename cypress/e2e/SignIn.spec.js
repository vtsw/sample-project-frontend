const existingUser = {
	email: 'steve1@gmail.com',
	password: '123',
}

const unregisteredUser = {
	email: 'unregistereduser1001@gmail.com',
	password: 'steve12',
}

const baseUrl = window.location.origin

describe('Sign in', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should not allow an unregistered user to sign in', () => {
		cy.signIn(unregisteredUser.email, unregisteredUser.password)
		cy.url().should('equal', `${baseUrl}/sign-in`)
		cy.get('[data-cy=signin-button]').should('exist')
		cy.log('Email does not exist')
	})

	it('should allow an existing user to sign in', () => {
		cy.signIn(existingUser.email, existingUser.password)
		cy.url().should('equal', `${baseUrl}/`)
		cy.findAllByText('main').should('exist')
	})
})
