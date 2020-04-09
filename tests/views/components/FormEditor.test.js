import React from 'react'

import { act, cleanup, fireEvent, render } from '@testing-library/react'

import { FormEditor } from '@views_components'

import { mockUser } from '@tests/shares/utils'

describe('FormEditor', () => {
	const mockProps = {
		selectedUser: {},
		onSubmit: jest.fn(),
		onCancel: jest.fn(),
		onDelete: jest.fn(),
	}

	beforeEach(() => {
		jest.spyOn(window, 'alert').mockImplementation(() => 'Form is not valid!!!')
	})

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<FormEditor {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should render all elements without crashing', () => {
		const { getByTestId } = render(<FormEditor {...mockProps} />)

		expect(getByTestId('formeditor-title')).toBeTruthy()
		expect(getByTestId('formeditor-email-input')).toBeTruthy()
		expect(getByTestId('formeditor-name-input')).toBeTruthy()
		expect(getByTestId('formeditor-password-input')).toBeTruthy()
		expect(getByTestId('formeditor-password-confirm-input')).toBeTruthy()
		expect(getByTestId('formeditor-submit-button')).toBeTruthy()
		expect(getByTestId('formeditor-cancel-button')).toBeTruthy()
	})

	it('should enable to focus Email input', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const emailInput = getByPlaceholderText('Email')

		act(() => {
			emailInput.focus()
		})

		expect(emailInput).toBe(document.activeElement)
	})

	it('should enable to change Email input value', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const emailInput = getByPlaceholderText('Email')

		expect(emailInput.value).toBe('')

		fireEvent.change(emailInput, {
			target: { value: mockUser.email.toLowerCase() },
		})

		expect(emailInput.value).toBe(mockUser.email)
	})

	it('should enable to focus Name input', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const nameInput = getByPlaceholderText('Name')

		act(() => {
			nameInput.focus()
		})

		expect(nameInput).toBe(document.activeElement)
	})

	it('should enable to change Name input value', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const nameInput = getByPlaceholderText('Name')

		expect(nameInput.value).toBe('')

		fireEvent.change(nameInput, { target: { value: mockUser.name } })

		expect(nameInput.value).toBe(mockUser.name)
	})

	it('should enable to focus Password input', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const passwordInput = getByPlaceholderText('Password')

		act(() => {
			passwordInput.focus()
		})

		expect(passwordInput).toBe(document.activeElement)
	})

	it('should enable to change Password input value', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const passwordInput = getByPlaceholderText('Password')

		expect(passwordInput.value).toBe('')

		fireEvent.change(passwordInput, { target: { value: mockUser.password } })

		expect(passwordInput.value).toBe(mockUser.password)
	})

	it('should enable to focus Password Confirm input', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const confirmPasswordInput = getByPlaceholderText('Password Confirm')

		act(() => {
			confirmPasswordInput.focus()
		})

		expect(confirmPasswordInput).toBe(document.activeElement)
	})

	it('should enable to change Password Confirm input value', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const confirmPasswordInput = getByPlaceholderText('Password Confirm')

		expect(confirmPasswordInput.value).toBe('')

		fireEvent.change(confirmPasswordInput, {
			target: { value: mockUser.password },
		})

		expect(confirmPasswordInput.value).toBe(mockUser.password)
	})

	it('should call onSubmit with valid form when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = render(
			<FormEditor {...mockProps} />
		)
		const emailInput = getByPlaceholderText('Email')
		const nameInput = getByPlaceholderText('Name')
		const passwordInput = getByPlaceholderText('Password')
		const confirmPasswordInput = getByPlaceholderText('Password Confirm')
		const submitButton = getByTestId('formeditor-submit-button')

		fireEvent.change(emailInput, {
			target: { value: mockUser.email.toLowerCase() },
		})
		fireEvent.change(nameInput, { target: { value: mockUser.name } })
		fireEvent.change(passwordInput, { target: { value: mockUser.password } })
		fireEvent.change(confirmPasswordInput, {
			target: { value: mockUser.password },
		})
		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(1)
	})

	it('should not call onSubmit with invalid form when click Register button', () => {
		const { getByTestId } = render(<FormEditor {...mockProps} />)

		const submitButton = getByTestId('formeditor-submit-button')

		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(0)
	})

	it('should call onCancel when click Cancel button', () => {
		const { getByTestId } = render(<FormEditor {...mockProps} />)

		const cancelButton = getByTestId('formeditor-cancel-button')

		fireEvent.click(cancelButton)

		expect(mockProps.onCancel).toHaveBeenCalled()
	})
})
