import React from 'react'

import { cleanup } from '@testing-library/react'

import { NavPanel } from '@views_components'

import { findDOMNodeOfNavPanel } from './helpers'

describe('<NavPanel />', () => {
	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = findDOMNodeOfNavPanel(<NavPanel />)

		expect(container).toMatchSnapshot()
	})
})
