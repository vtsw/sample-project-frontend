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

	it('should allow an existing user to sign in', () => {
		cy.get('[type=email]')
			.type(existingUser.email)
			.get('[type=password]')
			.type(existingUser.password)
			.get('[data-cy=signin-button]')
			.click()
			.url()
			.should('equal', `${baseUrl}/`)
		cy.findAllByText('main').should('exist')
	})

	it('should not allow an unregistered user to sign in', () => {
		cy.get('[type=email]')
			.type(unregisteredUser.email)
			.get('[type=password]')
			.type(unregisteredUser.password)
			.get('[data-cy=signin-button]')
			.click()
			.url()
			.should('equal', `${baseUrl}/sign-in`)
		cy.get('[data-cy=signin-button]').should('exist')
		cy.log('Email does not exist')
	})
})
