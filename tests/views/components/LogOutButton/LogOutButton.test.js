import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { LogOutButton } from '@views_components'

describe('<LogOutButton />', () => {
	const mockProps = {
		handleOnLogOut: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<LogOutButton {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should call handleOnLogOut correctly when click', () => {
		const { getByTestId } = render(<LogOutButton {...mockProps} />)
		const logoutButton = 'logoutbutton'

		fireEvent.click(getByTestId(logoutButton))

		expect(mockProps.handleOnLogOut).toHaveBeenCalled()
	})
})
