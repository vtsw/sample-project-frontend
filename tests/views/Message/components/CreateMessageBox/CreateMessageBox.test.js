import React from 'react'

import { act, cleanup, fireEvent } from '@testing-library/react'

import { CreateMessageBox } from '@views/Message/components'

import { findDOMNodeOfCreateMessageBox } from './helpers'

describe('<CreateMessageBox />', () => {
	const mockProps = {
		placeholder: 'text...',
		defaultValue: '',
		width: '350',
		onSubmit: jest.fn(),
		onChange: jest.fn(),
	}
	let rendered

	beforeEach(async () => {
		await act(async () => {
			rendered = findDOMNodeOfCreateMessageBox(
				<CreateMessageBox {...mockProps} />
			)
		})
	})

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = rendered

		expect(container).toMatchSnapshot()
	})

	it('should render a input with "text..." placeholder and a button with "Save" title', () => {
		const { getByPlaceholderText, getByText } = rendered

		expect(getByPlaceholderText(mockProps.placeholder)).toBeTruthy()
		expect(getByText('Save')).toBeTruthy()
	})

	it('should call correctly onSubmit function when click "Save" button', () => {
		const { getByText } = rendered

		fireEvent.click(getByText('Save'))

		expect(mockProps.onSubmit).toHaveBeenCalled()
	})

	it('should change value of input', async () => {
		const { getByPlaceholderText } = rendered
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
		const { getByPlaceholderText } = rendered
		const input = getByPlaceholderText(mockProps.placeholder)

		act(() => {
			input.focus()
		})

		expect(input).toBe(document.activeElement)
	})
})
