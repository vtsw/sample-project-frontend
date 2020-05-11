import React from 'react'

import { act, fireEvent } from '@testing-library/react'

import { SignInFormEditor } from '@views/SignIn/components'

import { mockUser } from '@tests/shares/utils'
import { findDOMNodeOfSignIn } from './helpers'

describe('<SignInFormEditor />', () => {
	const mockProps = {
		onSubmit: jest.fn(),
		history: { push: jest.fn() },
	}
	let rendered

	beforeEach(() => {
		rendered = findDOMNodeOfSignIn(<SignInFormEditor {...mockProps} />)
	})

	it('should match snapshot', async () => {
		expect(rendered.container).toMatchSnapshot()
	})

	it('should enable to focus Email input', () => {
		const { getByPlaceholderText } = rendered
		const emailInput = getByPlaceholderText('Email')

		act(() => {
			emailInput.focus()
		})

		expect(emailInput).toBe(document.activeElement)
	})

	it('should enable to change Email input value', () => {
		const { getByPlaceholderText } = rendered
		const emailInput = getByPlaceholderText('Email')

		expect(emailInput.value).toBe('')

		fireEvent.change(emailInput, { target: { value: mockUser.email } })

		expect(emailInput.value).toBe(mockUser.email)
	})

	it('should enable to focus Password input', () => {
		const { getByPlaceholderText } = rendered
		const passwordInput = getByPlaceholderText('Password')

		act(() => {
			passwordInput.focus()
		})

		expect(passwordInput).toBe(document.activeElement)
	})

	it('should enable to change Password input value', () => {
		const { getByPlaceholderText } = rendered
		const passwordInput = getByPlaceholderText('Password')

		expect(passwordInput.value).toBe('')

		fireEvent.change(passwordInput, { target: { value: mockUser.password } })

		expect(passwordInput.value).toBe(mockUser.password)
	})

	it('should call onSubmit with valid form when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = rendered
		const emailInput = getByPlaceholderText('Email')
		const passwordInput = getByPlaceholderText('Password')
		const submitButton = getByTestId('signin-button')

		fireEvent.change(emailInput, {
			target: { value: mockUser.email.toLowerCase() },
		})
		fireEvent.change(passwordInput, { target: { value: mockUser.password } })

		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(1)
	})

	it('should not call onSubmit with invalid email when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = rendered
		const emailInput = getByPlaceholderText('Email')
		const passwordInput = getByPlaceholderText('Password')
		const submitButton = getByTestId('signin-button')
		const invalidEmail = 'abc@example.com'

		jest
			.spyOn(window, 'alert')
			.mockImplementation(() => 'Invalid email or password')

		fireEvent.change(emailInput, {
			target: { value: invalidEmail.toLowerCase() },
		})
		fireEvent.change(passwordInput, { target: { value: mockUser.password } })

		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(0)
		expect(window.alert).toHaveBeenCalled()
	})

	it('should not call onSubmit with invalid password when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = rendered
		const emailInput = getByPlaceholderText('Email')
		const passwordInput = getByPlaceholderText('Password')
		const submitButton = getByTestId('signin-button')
		const invalidPassword = 'ab'

		jest
			.spyOn(window, 'alert')
			.mockImplementation(() => 'Invalid email or password')

		fireEvent.change(emailInput, {
			target: { value: mockUser.email.toLowerCase() },
		})
		fireEvent.change(passwordInput, { target: { value: invalidPassword } })

		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(0)
		expect(window.alert).toHaveBeenCalled()
	})

	it('should not call onSubmit with invalid password and invalid email when click Register button', () => {
		const { getByTestId, getByPlaceholderText } = rendered
		const emailInput = getByPlaceholderText('Email')
		const passwordInput = getByPlaceholderText('Password')
		const submitButton = getByTestId('signin-button')
		const invalidEmail = 'abc@example.com'
		const invalidPassword = 'ab'

		jest
			.spyOn(window, 'alert')
			.mockImplementation(() => 'Invalid email or password')

		fireEvent.change(emailInput, {
			target: { value: invalidEmail.toLowerCase() },
		})
		fireEvent.change(passwordInput, { target: { value: invalidPassword } })

		fireEvent.click(submitButton)

		expect(mockProps.onSubmit).toHaveBeenCalledTimes(0)
		expect(window.alert).toHaveBeenCalled()
	})

	it('should not call history.push when click sign up text', () => {
		const { getByTestId } = rendered
		const signUpText = getByTestId('signup-text')

		fireEvent.click(signUpText)

		expect(mockProps.history.push).toHaveBeenCalledTimes(1)
	})
})
