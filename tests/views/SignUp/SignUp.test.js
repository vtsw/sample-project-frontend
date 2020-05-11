import React from 'react'

import SignUp from '@views/SignUp'

import { findDOMNodeOfSignUp } from './helpers'

describe('<SignUp />', () => {
	it('should match snapshot', async () => {
		const { container } = findDOMNodeOfSignUp(<SignUp />)
		expect(container).toMatchSnapshot()
	})
})
