import React from 'react'
import { Route } from 'react-router-dom'

import { App } from '../src/App'

import { findDOMNodeOfApp } from './helpers'

describe('<App/>', () => {
	it('should match snapshot', () => {
		const { container } = findDOMNodeOfApp(<Route component={App} />)

		expect(container).toMatchSnapshot()
	})
})
