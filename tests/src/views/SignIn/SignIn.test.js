/* eslint-disable no-undef */
// describe('authentication', () => {
// 	let user
// beforeEach(() => {
// 	return cy
// 		.logout()
// 		.createNewUser()
// 		.then(u => (user = u))
// 		.visit('/')
// })
// })

describe('authentication', function() {
	beforeEach(() => {
		return cy.visit('/')
	})
	it('should allow existing users to login', function() {
		cy.get('button')
	})
})
