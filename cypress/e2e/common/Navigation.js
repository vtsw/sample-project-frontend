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
		.get('[data-testid=signup-text]')
		.should('exist')
		.click()

const navigateFromMainPageTofUserPage = () =>
	cy
		.get('[data-testid=navbaritem-user]')
		.should('exist')
		.click()

const navigateFromMainPageToFormEditorOfUserPage = () => {
	navigateFromMainPageTofUserPage()
	cy.get('[data-testid=create-user-button')
		.should('exist')
		.click()
}

export default {
	withNavigation,
	navigateToSignInPage,
	navigateToSignUpPage,
	SignUp: {
		navigateFromSignInPageToSignUpPage,
		navigateFromMainPageToFormEditorOfUserPage,
	},
	User: {
		navigateFromMainPageTofUserPage: navigateFromMainPageTofUserPage,
	},
}
