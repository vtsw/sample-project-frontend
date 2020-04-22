import React from 'react'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'

import { WelcomeDialog } from '@views/User/components'

describe('WelcomeDialog', () => {
	const mockProps = {
		setDialogVisible: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container, getByText } = render(<WelcomeDialog {...mockProps} />)

		expect(container).toMatchSnapshot()
		expect(getByText('Welcome to Vatech !!!')).toBeTruthy()
	})

	it('should call setDialogVisible correctly when click Create user button', () => {
		const { getByTestId, getByText } = render(<WelcomeDialog {...mockProps} />)
		const createUserButton = getByTestId('create-user-button')

		fireEvent.click(createUserButton)

		waitFor(() => expect(getByText('Welcome to Vatech !!!')).toBeFalsy())
		expect(mockProps.setDialogVisible).toHaveBeenCalled()
	})
})
