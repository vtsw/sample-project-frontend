import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import { DeleteDialog } from '@views_components'

describe('DeleteDialog', () => {
	const mockProps = {
		open: false,
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

	it('should render without crashing when open', () => {
		const props = { ...mockProps, open: true }
		const { getByText } = render(<DeleteDialog {...props} />)

		expect(getByText('Delete!')).toBeTruthy()
		expect(getByText('Yes')).toBeTruthy()
		expect(getByText('No')).toBeTruthy()
	})

	it('should call correctly onAgree function when click Yes button', () => {
		const props = { ...mockProps, open: true }
		const { getByText } = render(<DeleteDialog {...props} />)

		const yesButton = getByText('Yes')

		fireEvent.click(yesButton)

		expect(props.onAgree).toHaveBeenCalled()
	})
})
