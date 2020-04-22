import React from 'react'

import { act } from '@testing-library/react'

import SignUp from '@views/SignUp'

import { findDOMNodeOfSignUp } from './helpers'

describe('<SignUp />', () => {
	let rendered
	beforeEach(async () => {
		await act(async () => {
			rendered = findDOMNodeOfSignUp(<SignUp />)
		})
	})

	it('should match snapshot', async () => {
		expect(rendered.container).toMatchSnapshot()
	})
})
