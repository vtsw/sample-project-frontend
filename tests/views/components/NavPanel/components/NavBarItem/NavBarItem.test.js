import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { NavBarItem } from '@views_components/NavPanel/components'

describe('<NavBarItem />', () => {
	const mockProps = {
		styles: '',
		page: 'user',
		pathname: '/user',
		handleOnChangePage: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<NavBarItem {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should call handleOnChangePage correctly when click', () => {
		const { getByTestId } = render(<NavBarItem {...mockProps} />)
		const navItem = `navbaritem-${mockProps.page}`

		fireEvent.click(getByTestId(navItem))

		expect(mockProps.handleOnChangePage).toHaveBeenCalled()
	})
})
