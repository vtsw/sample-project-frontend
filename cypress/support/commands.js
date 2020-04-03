import '@testing-library/cypress/add-commands'

Cypress.Commands.add('signIn', (email, password) => {
	cy.get('[type=email]')
		.type(email)
		.get('[type=password]')
		.type(password)
		.get('[data-cy=signin-button]')
		.click()
})

Cypress.Commands.add(
	'registerUser',
	(email, name, password, confirmPassword) => {
		cy.get('[data-cy=email-input')
			.type(email)
			.get('[data-cy=name-input')
			.type(name)
			.get('[data-cy=password-input')
			.type(password)
			.get('[data-cy=confirm-password-input')
			.type(confirmPassword)
			.get('[data-cy=submit-button]')
			.click()
	}
)
