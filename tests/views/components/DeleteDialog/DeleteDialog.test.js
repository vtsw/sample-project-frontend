import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { DeleteDialog } from '@views_components'

describe('DeleteDialog', () => {
	const mockProps = {
		open: true,
		onClose: jest.fn(),
		onAgree: jest.fn(),
		onDisagree: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<DeleteDialog {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should render all elements without crashing', () => {
		const { getByTestId } = render(<DeleteDialog {...mockProps} />)

		expect(getByTestId('deletedialog-title')).toBeTruthy()
		expect(getByTestId('deletedialog-agreebutton')).toBeTruthy()
		expect(getByTestId('deletedialog-disagreebutton')).toBeTruthy()
	})

	it('should call correctly onAgree function when click Yes button', () => {
		const { getByTestId } = render(<DeleteDialog {...mockProps} />)

		const agreeButton = getByTestId('deletedialog-agreebutton')

		fireEvent.click(agreeButton)

		expect(mockProps.onAgree).toHaveBeenCalled()
	})

	it('should call correctly onDisagree function when click Yes button', () => {
		const { getByTestId } = render(<DeleteDialog {...mockProps} />)

		const disagreeButton = getByTestId('deletedialog-disagreebutton')

		fireEvent.click(disagreeButton)

		expect(mockProps.onDisagree).toHaveBeenCalled()
	})
})
