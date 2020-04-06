import React from 'react'
import { render, fireRender } from '@testing-library/react'

import { ActionInputBox } from '@views_components'

describe('ActionInputBox', () => {
	let mockProps = {
		type: '',
		placeholder: '',
		defaultValue: '',
		width: '350',
		onSubmit: jest.fn(),
		onChange: jest.fn(),
	}
	it('should render 1 input and 1 button with Search icon', () => {
		mockProps.type = 'search'
		mockProps.placeholder = 'search...'
		const { getByPlaceholderText, getByTestId } = render(
			<ActionInputBox {...mockProps} />
		)

		expect(getByPlaceholderText(mockProps.placeholder)).toBeTruthy()
		expect(getByTestId('search-icon')).toBeTruthy()
	})

	it('should render 1 input and 1 button with Save title', () => {
		mockProps.type = 'create'
		mockProps.placeholder = 'text...'
		const { getByPlaceholderText, getByText } = render(
			<ActionInputBox {...mockProps} />
		)

		expect(getByPlaceholderText(mockProps.placeholder)).toBeTruthy()
		expect(getByText('Save')).toBeTruthy()
	})
})
