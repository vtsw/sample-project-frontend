import React from 'react'

import { cleanup, render } from '@testing-library/react'

import { Loading } from '@views_components'

describe('<Loading />', () => {
	const mockProps = {
		open: true,
		msg: 'Loading...',
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container, queryByText } = render(<Loading {...mockProps} />)

		expect(container).toMatchSnapshot()
		expect(queryByText(mockProps.msg)).toBeTruthy()
	})

	it('should render a <div/> when open is falsy', () => {
		const props = { ...mockProps, open: false }
		const { queryByText } = render(<Loading {...props} />)

		expect(queryByText(props.msg)).toBeFalsy()
	})
})
