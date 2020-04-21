import React from 'react'

import {
	act,
	cleanup,
	fireEvent,
	render,
	waitFor,
} from '@testing-library/react'

import { FormEditor } from '@views_components'

import { mockUser, mockUserList } from '@tests/shares/utils'

describe('<FormEditor />', () => {
	const mockProps = {
		selectedUser: {
			id: '',
			email: '',
			name: '',
		},
		onSubmit: jest.fn(),
		onCancel: jest.fn(),
		onDelete: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<FormEditor {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it('should enable to focus Email input', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const emailInput = getByPlaceholderText('Email')

		act(() => {
			emailInput.focus()
		})

		expect(emailInput.value).toBe('')

		fireEvent.change(emailInput, {
			target: { value: mockUser.email.toLowerCase() },
		})

		expect(emailInput.value).toBe(mockUser.email)
	})

	it('should enable to change Email input value', () => {
		const { getByPlaceholderText } = render(<FormEditor {...mockProps} />)
		const emailInput = getByPlaceholderText('Email')

		fireEvent.change(emailInput, { target: { value: mockUser.email } })

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

	it('should not call onSubmit with invalid email when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = render(
			<FormEditor {...mockProps} />
		)
		const emailInput = getByPlaceholderText('Email')
		const submitButton = getByTestId('formeditor-submit-button')
		const invalidEmail = 'abc@example.com'

		jest.spyOn(window, 'alert').mockImplementation(() => 'Form is not valid!!!')

		fireEvent.change(emailInput, {
			target: { value: invalidEmail },
		})
		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(0)
		expect(window.alert).toHaveBeenCalled()
	})

	it('should not call onSubmit with invalid name when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = render(
			<FormEditor {...mockProps} />
		)
		const nameInput = getByPlaceholderText('Name')
		const submitButton = getByTestId('formeditor-submit-button')
		const invalidName = 'ab'

		jest.spyOn(window, 'alert').mockImplementation(() => 'Form is not valid!!!')

		fireEvent.change(nameInput, { target: { value: invalidName } })
		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(0)
		expect(window.alert).toHaveBeenCalled()
	})

	it('should not call onSubmit with invalid password when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = render(
			<FormEditor {...mockProps} />
		)
		const passwordInput = getByPlaceholderText('Password')
		const submitButton = getByTestId('formeditor-submit-button')
		const invalidPassword = 'ab'

		jest.spyOn(window, 'alert').mockImplementation(() => 'Form is not valid!!!')

		fireEvent.change(passwordInput, { target: { value: invalidPassword } })
		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(0)
		expect(window.alert).toHaveBeenCalled()
	})

	it('should not call onSubmit with invalid  password confirm when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = render(
			<FormEditor {...mockProps} />
		)
		const passwordInput = getByPlaceholderText('Password')
		const confirmPasswordInput = getByPlaceholderText('Password Confirm')
		const submitButton = getByTestId('formeditor-submit-button')
		const invalidPassword = 'ab'

		jest.spyOn(window, 'alert').mockImplementation(() => 'Form is not valid!!!')

		fireEvent.change(passwordInput, {
			target: { value: invalidPassword },
		})
		fireEvent.change(confirmPasswordInput, {
			target: { value: invalidPassword + 'c' },
		})
		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(0)
		expect(window.alert).toHaveBeenCalled()
	})

	it('should call onCancel when click Cancel button and form is reset', () => {
		const props = { ...mockProps, selectedUser: mockUserList[0] }
		const { getByTestId, getByPlaceholderText } = render(
			<FormEditor {...props} />
		)
		const cancelButton = getByTestId('formeditor-cancel-button')

		fireEvent.click(cancelButton)

		waitFor(() => {
			expect(getByPlaceholderText('Email').value).toBe('')
			expect(getByPlaceholderText('Name').value).toBe('')
			expect(getByPlaceholderText('Password').value).toBe('')
			expect(getByPlaceholderText('Password Confirm').value).toBe('')
		})

		expect(mockProps.onCancel).toHaveBeenCalled()
	})
})
