import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { NavBarContainer } from '@views_components/NavBar/components'

describe('NavBarContainer', () => {
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

	const navBarItems = [...mockProps.items.map(item => item.page), 'logout']

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<NavBarContainer {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it.each(navBarItems)('should render %s item of NavBar correctly', item => {
		const { getByTestId } = render(<NavBarContainer {...mockProps} />)
		const navBarItem = `navbaritem-${item}`

		expect(getByTestId(navBarItem)).toBeTruthy()
	})

	it('should allow click Main item of NavBar', () => {
		const { getByTestId } = render(<NavBarContainer {...mockProps} />)
		const navBarItem = `navbaritem-main`

		fireEvent.click(getByTestId(navBarItem))

		expect(mockProps.history.push).toHaveBeenCalled()
	})

	it.each(navBarItems)('should allow click %s item of NavBar', item => {
		const { getByTestId } = render(<NavBarContainer {...mockProps} />)
		const navBarItem = `navbaritem-${item}`

		const calledFunction =
			item === 'logout' ? mockProps.handleOnLogOut : mockProps.history.push

		fireEvent.click(getByTestId(navBarItem))

		expect(calledFunction).toHaveBeenCalled()
	})
})
