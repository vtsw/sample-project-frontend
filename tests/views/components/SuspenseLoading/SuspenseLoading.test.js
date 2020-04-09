import React from 'react'

import { cleanup, render } from '@testing-library/react'

import { SuspenseLoading } from '@views_components'

describe('SuspenseLoading', () => {
	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container, queryByText } = render(<SuspenseLoading />)

		expect(container).toMatchSnapshot()
		expect(queryByText('Loading...')).toBeTruthy()
	})
})
