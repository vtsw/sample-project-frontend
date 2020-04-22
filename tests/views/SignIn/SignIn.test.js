import React from 'react'

import { act } from '@testing-library/react'

import SignIn from '@views/SignIn'

import { findDOMNodeOfSignIn } from './helpers'

describe('<SignIn />', () => {
	let rendered
	beforeEach(async () => {
		await act(async () => {
			rendered = findDOMNodeOfSignIn(<SignIn />)
		})
	})

	it('should match snapshot', async () => {
		expect(rendered.container).toMatchSnapshot()
	})
})
