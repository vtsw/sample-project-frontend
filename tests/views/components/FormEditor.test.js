import React from 'react'

import { render, fireEvent, cleanup } from '@testing-library/react'

import { FormEditor } from '@views_components'

describe('FormEditor', () => {
	const mockProps = {
		selectedUser: {},
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

	describe('SignUp', () => {
		afterEach(() => {
			cleanup()
		})

		it('should render without crashing', () => {
			const { getByText, getByTestId } = render(<FormEditor {...mockProps} />)

			expect(getByText('Sign up')).toBeTruthy()
			expect(getByTestId('formeditor-email-input')).toBeTruthy()
			expect(getByTestId('formeditor-name-input')).toBeTruthy()
			expect(getByTestId('formeditor-password-input')).toBeTruthy()
			expect(getByTestId('formeditor-password-confirm-input')).toBeTruthy()
			expect(getByTestId('formeditor-submit-button')).toBeTruthy()
			expect(getByTestId('formeditor-cancel-button')).toBeTruthy()
		})

		it('should call correctly onSubmit function when click Modify button', () => {
			const { getByTestId } = render(<FormEditor {...mockProps} />)

			const submitButton = getByTestId('formeditor-submit-button')

			fireEvent.click(submitButton)

			expect(mockProps.onSubmit).toHaveBeenCalled()
		})
	})

	describe('Modify', () => {
		const props = {
			...mockProps,
			selectedUser: { id: '123', email: 'steve1@gmail.com', name: 'steve1' },
		}

		afterEach(() => {
			cleanup()
		})

		it('should render without crashing', () => {
			const { getByText, getByTestId } = render(<FormEditor {...props} />)

			expect(getByText('Modify')).toBeTruthy()
			expect(getByTestId('formeditor-email-input')).toBeTruthy()
			expect(getByTestId('formeditor-name-input')).toBeTruthy()
			expect(getByTestId('formeditor-password-input')).toBeTruthy()
			expect(getByTestId('formeditor-password-confirm-input')).toBeTruthy()
			expect(getByTestId('formeditor-submit-button')).toBeTruthy()
			expect(getByTestId('formeditor-delete-button')).toBeTruthy()
			expect(getByTestId('formeditor-cancel-button')).toBeTruthy()
		})

		it('should call correctly onSubmit function when click Register button', () => {
			const { getByTestId } = render(<FormEditor {...props} />)

			const submitButton = getByTestId('formeditor-submit-button')

			fireEvent.click(submitButton)

			expect(props.onSubmit).toHaveBeenCalled()
		})
	})
})
