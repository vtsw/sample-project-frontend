import React from 'react'

import SignIn from '@views/SignIn'

import { findDOMNodeOfSignIn } from './helpers'

describe('<SignIn />', () => {
	it('should match snapshot', async () => {
		const { container } = findDOMNodeOfSignIn(<SignIn />)

		expect(container).toMatchSnapshot()
	})
})
