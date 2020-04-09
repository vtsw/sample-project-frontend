import React from 'react'
import { act, cleanup, fireEvent, render } from '@testing-library/react'

import { ModifyDialog } from '@views_components'

describe('ModifyDialog', () => {
	const mockProps = {
		open: true,
		valueDefault: '',
		onClose: jest.fn(),
		onAgree: jest.fn(),
		onDisagree: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<ModifyDialog {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should render all elements without crashing', () => {
		const { getByTestId } = render(<ModifyDialog {...mockProps} />)

		expect(getByTestId('modifydialog-title')).toBeTruthy()
		expect(getByTestId('modifydialog-input')).toBeTruthy()
		expect(getByTestId('modifydialog-agreebutton')).toBeTruthy()
		expect(getByTestId('modifydialog-disagreebutton')).toBeTruthy()
	})

	it('should enable to focus input', () => {
		const { getByPlaceholderText } = render(<ModifyDialog {...mockProps} />)
		const input = getByPlaceholderText('placeholder')

		act(() => {
			input.focus()
		})

		expect(input).toBe(document.activeElement)
	})

	it('should enable to change input value', () => {
		const { getByPlaceholderText } = render(<ModifyDialog {...mockProps} />)
		const input = getByPlaceholderText('placeholder')

		expect(input.value).toBe(mockProps.valueDefault)

		fireEvent.change(input, {
			target: { value: 'hello' },
		})

		expect(input.value).toBe('hello')
	})

	it('should call correctly onAgree function with valid input when click Yes button', () => {
		const { getByTestId, getByPlaceholderText } = render(
			<ModifyDialog {...mockProps} />
		)

		const yesButton = getByTestId('modifydialog-agreebutton')
		const input = getByPlaceholderText('placeholder')

		expect(input.value).toBe(mockProps.valueDefault)

		fireEvent.change(input, { target: { value: 'hello' } })
		fireEvent.click(yesButton)

		expect(mockProps.onAgree).toHaveBeenCalled()
		expect(input.value).toBe('hello')
	})

	it('should not call correctly onAgree with empty input function when click Yes button', () => {
		const { getByTestId } = render(<ModifyDialog {...mockProps} />)

		const yesButton = getByTestId('modifydialog-agreebutton')

		fireEvent.click(yesButton)

		expect(mockProps.onAgree).toHaveBeenCalledTimes(0)
	})

	it('should call correctly onDisagree function when click Cancel button', () => {
		const { getByTestId } = render(<ModifyDialog {...mockProps} />)

		const yesButton = getByTestId('modifydialog-disagreebutton')

		fireEvent.click(yesButton)

		expect(mockProps.onDisagree).toHaveBeenCalled()
	})
})
