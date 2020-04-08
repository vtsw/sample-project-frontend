/* eslint-disable no-undef */
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('signIn', (email, password) => {
	cy.get('[type=email]')
		.type(email)
		.get('[type=password]')
		.type(password)
		.get('[data-testid=signin-button]')
		.click()
})

Cypress.Commands.add(
	'registerUser',
	({ email, name, password, confirmPassword }) => {
		cy.get('[data-testid=formeditor-email-input')
			.type(email)
			.get('[data-testid=formeditor-name-input')
			.type(name)
			.get('[data-testid=formeditor-password-input')
			.type(password)
			.get('[data-testid=formeditor-password-confirm-input')
			.type(confirmPassword)
			.get('[data-testid=formeditor-submit-button]')
			.click()
	}
)

//turn off all uncaught exception handling
Cypress.on('uncaught:exception', () => {
	// returning false here prevents Cypress from
	// failing the test
	return false
})
