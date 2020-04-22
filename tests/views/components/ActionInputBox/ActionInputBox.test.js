import React from 'react'
import { act, cleanup, fireEvent, render } from '@testing-library/react'

import { ActionInputBox } from '@views_components'

describe('<ActionInputBox />', () => {
	const mockProps = {
		type: 'search',
		placeholder: 'search...',
		defaultValue: '',
		width: '350',
		onSubmit: jest.fn(),
		onChange: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<ActionInputBox {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should render 1 input and 1 button', () => {
		let props = { ...mockProps }
		const { getByPlaceholderText, getByTestId, getByText, rerender } = render(
			<ActionInputBox {...props} />
		)

		expect(getByPlaceholderText(props.placeholder)).toBeTruthy()
		expect(getByTestId('search-icon')).toBeTruthy()

		// change props
		props = { ...props, type: 'create', placeholder: 'text...' }

		rerender(<ActionInputBox {...props} />)
		expect(getByPlaceholderText(props.placeholder)).toBeTruthy()
		expect(getByText('Save')).toBeTruthy()
	})

	it('should call correctly onSubmit function when click button', () => {
		const { getByTestId } = render(<ActionInputBox {...mockProps} />)

		fireEvent.click(getByTestId('search-icon'))

		expect(mockProps.onSubmit).toHaveBeenCalled()
	})

	it('should change value of input', () => {
		const { getByPlaceholderText } = render(<ActionInputBox {...mockProps} />)
		const input = getByPlaceholderText(mockProps.placeholder)

		expect(input.value).toBe('')

		fireEvent.change(input, { target: { value: 'Hello world' } })

		expect(input.value).toBe('Hello world')
	})

	it('should enable input when focus on input', () => {
		const { getByPlaceholderText } = render(<ActionInputBox {...mockProps} />)
		const input = getByPlaceholderText(mockProps.placeholder)

		act(() => {
			input.focus()
		})

		expect(input).toBe(document.activeElement)
	})
})
