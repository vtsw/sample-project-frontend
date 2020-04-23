/* eslint-disable no-undef */
import { existingUser } from '../utils'
import { Navigation } from './common'
import { mockUserList } from '../../tests/shares/utils'

const UserNav = Navigation.User

describe('Sign up', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should allow updating users email', () => {
		cy.signIn(existingUser.email, existingUser.password)
		UserNav.navigateFromMainPageTofUserPage()
		cy.get(`[data-testid=row-${mockUserList[1].id}]`)
			.should('exist')
			.click()
		// const emailInput = cy.get('[placeholder="Email"]')
		// emailInput.invoke('val').then(value => {
		// 	const email = value
		// 	const newEmail = 'cy' + email
		// })
		cy.get('[placeholder="Email"]')
			.focus()
			.clear()
		// cy.get('[data-testid=formeditor-email-input').type(existingUser.email)
		// const tmpUser = { ...userInfo, email: existingUser.email }
		// cy.registerUser(tmpUser)
		// cy.on('window:alert', error => {
		// 	expect(error.message).to.equal('GraphQL error: The email already exists.')
		// })
	})
})
