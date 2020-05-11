import React from 'react'

import Main from '@views/Main'

import wait from 'waait'

import { act } from '@testing-library/react'

import { findDOMNodeOfMain } from './helpers'

describe('<Main />', () => {
	beforeEach(() => {
		jest.setTimeout(30000)
	})

	it('should match snapshot', async () => {
		let rendered

		await act(async () => {
			rendered = findDOMNodeOfMain(<Main />)
		})
		await wait(10)

		expect(rendered).toMatchSnapshot()
	})
})
