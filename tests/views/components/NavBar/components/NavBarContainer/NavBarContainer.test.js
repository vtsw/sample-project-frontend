import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { NavBarContainer } from '@views_components/NavBar/components'

describe('<NavBarContainer />', () => {
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
		const { container } = render(<NavBarContainer {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should call history.push correctly when click Main item', () => {
		const { getByTestId } = render(<NavBarContainer {...mockProps} />)
		const mainItem = `navbaritem-main`

		fireEvent.click(getByTestId(mainItem))

		expect(mockProps.history.push).toHaveBeenCalled()
	})

	it('should call handleOnLogOut correctly when click Log Out item', () => {
		const { getByTestId } = render(<NavBarContainer {...mockProps} />)
		const logOutItem = 'logoutbutton'

		fireEvent.click(getByTestId(logOutItem))

		expect(mockProps.handleOnLogOut).toHaveBeenCalled()
	})
})
