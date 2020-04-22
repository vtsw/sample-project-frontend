import React from 'react'

import { cleanup } from '@testing-library/react'

import { NavBar } from '@views_components'

import { findDOMNodeOfNavBar } from './helpers'

describe('<NavBar />', () => {
	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = findDOMNodeOfNavBar(<NavBar />)

		expect(container).toMatchSnapshot()
	})
})
