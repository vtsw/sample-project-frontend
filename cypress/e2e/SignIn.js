describe('Sign in', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should allow existing users to sign in', () => {
		cy.get('[type=email]')
			.type('steve1@gmail.com')
			.get('[type=password]')
			.type('123')
			.get('[type=button]')
			.click()
			.url()
			.should('equal', `${window.location.origin}/`)
		cy.findAllByText('main').should('exist')
	})
})
