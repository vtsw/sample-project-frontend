import React from 'react'

import { act, fireEvent } from '@testing-library/react'

import { SignInFormEditor } from '@views/SignIn/components'

import { mockUser } from '@tests/shares/utils'
import { findDOMNodeOfSignIn } from './helpers'

describe('<SignInFormEditor />', () => {
	let rendered
	beforeEach(async () => {
		await act(async () => {
			rendered = findDOMNodeOfSignIn(<SignInFormEditor />)
		})
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
})
