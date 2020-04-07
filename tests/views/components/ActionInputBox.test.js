import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import { ActionInputBox } from '@views_components'

describe('ActionInputBox', () => {
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

	it('should matche snapshot', () => {
		const props = { ...mockProps }
		const { container } = render(<ActionInputBox {...props} />)

		expect(container.firstChild).toMatchSnapshot()
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
		const props = { ...mockProps }
		const { getByTestId } = render(<ActionInputBox {...props} />)

		fireEvent.click(getByTestId('search-icon'))

		expect(props.onSubmit).toHaveBeenCalled()
	})

	it('should change value of input', () => {
		const props = { ...mockProps }
		const { getByPlaceholderText } = render(<ActionInputBox {...props} />)
		const input = getByPlaceholderText(props.placeholder)

		expect(input.value).toBe('')

		fireEvent.change(input, { target: { value: 'Hello world' } })

		expect(input.value).toBe('Hello world')
	})
})
