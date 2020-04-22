import React from 'react'

import { act } from '@testing-library/react'
import wait from 'waait'

import User from '@views/User'

import { findDOMNodeOfUser } from './helpers'

describe('<User />', () => {
	it('should match snapshot', async () => {
		let rendered
		await act(async () => {
			rendered = findDOMNodeOfUser(<User />)
		})
		await wait(10)
		expect(rendered).toMatchSnapshot()
	})
})
