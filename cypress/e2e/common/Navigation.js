/* eslint-disable no-undef */
function withNavigation(navFn, testFn) {
	return () => {
		navFn()
		testFn()
	}
}

const navigateToSignUpPage = () => {
	cy.visit('/sign-up')
}

const navigateToSignInPage = () => {
	cy.visit('/sign-in')
}

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

export default {
	withNavigation: withNavigation,
	navigateToSignInPage: navigateToSignInPage,
	navigateToSignUpPage: navigateToSignUpPage,
	SignUp: {
		navigateFromSignInPageToSignUpPage: navigateFromSignInPageToSignUpPage,
		navigateFromMainPageToFormEditorOfUserPage: navigateFromMainPageToFormEditorOfUserPage,
	},
}
