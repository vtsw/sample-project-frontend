import wait from 'waait'

import { act } from '@testing-library/react'

import { findDOMNodeOfMain } from './utils'

describe('<Main />', () => {
	it('should match snapshot', async () => {
		let rendered

		await act(async () => {
			rendered = findDOMNodeOfMain()
		})
		await wait(10)

		expect(rendered).toMatchSnapshot()
	})
})
