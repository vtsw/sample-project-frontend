import React from 'react'
import { act, cleanup, fireEvent, render } from '@testing-library/react'

import { SearchMessageBox } from '@views/Message/components'

describe('<SearchMessageBox />', () => {
	const mockProps = {
		placeholder: 'search...',
		defaultValue: '',
		width: '350',
		onSubmit: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<SearchMessageBox {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should render a input with "text..." placeholder and a button with "Save" title', () => {
		const { getByPlaceholderText } = render(<SearchMessageBox {...mockProps} />)

		expect(getByPlaceholderText(mockProps.placeholder)).toBeTruthy()
	})

	it('should call correctly onSubmit function when click "Save" button', () => {
		const { getByText } = render(<SearchMessageBox {...mockProps} />)

		fireEvent.click(getByText('Save'))

		expect(mockProps.onSubmit).toHaveBeenCalled()
	})

	it('should change value of input', async () => {
		const { getByPlaceholderText } = render(<SearchMessageBox {...mockProps} />)
		const input = getByPlaceholderText(mockProps.placeholder)

		expect(input.value).toBe('')

		await act(async () => {
			fireEvent.change(input, {
				target: { value: 'Hello world' },
			})
		})

		expect(input.value).toBe('Hello world')
	})

	it('should enable input when focus on input', async () => {
		const { getByPlaceholderText } = render(<SearchMessageBox {...mockProps} />)
		const input = getByPlaceholderText(mockProps.placeholder)

		act(() => {
			input.focus()
		})

		expect(input).toBe(document.activeElement)
	})
})
