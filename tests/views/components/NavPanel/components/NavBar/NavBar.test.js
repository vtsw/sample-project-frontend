import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { NavBar } from '@views_components/NavPanel/components'

describe('<NavBar />', () => {
	const mockProps = {
		location: { pathname: '/' },
		history: { push: jest.fn() },
		items: [
			{ page: 'main', pathname: '/' },
			{ page: 'user', pathname: '/user' },
			{ page: 'message', pathname: '/message' },
			{ page: 'file', pathname: '/file' },
		],
		handleOnLogOut: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<NavBar {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should call history.push correctly when click Main item', () => {
		const { getByTestId } = render(<NavBar {...mockProps} />)
		const mainItem = `navbaritem-main`

		fireEvent.click(getByTestId(mainItem))

		expect(mockProps.history.push).toHaveBeenCalled()
	})
})
