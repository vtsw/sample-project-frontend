import React from 'react'
import { act, cleanup, fireEvent } from '@testing-library/react'

import { createMockClient } from 'mock-apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { CreateMessageBox } from '@views/Message/components'

import { initialState, resolvers } from '@src/client'
import { renderWithApolloClient } from '@tests/shares/utils'

describe('CreateMessageBox', () => {
	const mockProps = {
		placeholder: 'text...',
		defaultValue: '',
		width: '350',
		onSubmit: jest.fn(),
		onChange: jest.fn(),
	}

	const cache = new InMemoryCache()
	cache.writeData({
		data: { ...initialState, messageCreateValueOfMessage: '' },
	})
	const mockClient = createMockClient({ cache, resolvers })

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = renderWithApolloClient(
			<CreateMessageBox {...mockProps} />,
			mockClient
		)

		expect(container).toMatchSnapshot()
	})

	it('should render a input with "text..." placeholder and a button with "Save" title', () => {
		const { getByPlaceholderText, getByText } = renderWithApolloClient(
			<CreateMessageBox {...mockProps} />,
			mockClient
		)

		expect(getByPlaceholderText(mockProps.placeholder)).toBeTruthy()
		expect(getByText('Save')).toBeTruthy()
	})

	it('should call correctly onSubmit function when click "Save" button', () => {
		const { getByText } = renderWithApolloClient(
			<CreateMessageBox {...mockProps} />,
			mockClient
		)

		fireEvent.click(getByText('Save'))

		expect(mockProps.onSubmit).toHaveBeenCalled()
	})

	it('should change value of input', async () => {
		const { getByPlaceholderText } = renderWithApolloClient(
			<CreateMessageBox {...mockProps} />,
			mockClient
		)
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
		const { getByPlaceholderText } = renderWithApolloClient(
			<CreateMessageBox {...mockProps} />,
			mockClient
		)
		const input = getByPlaceholderText(mockProps.placeholder)

		act(() => {
			input.focus()
		})

		expect(input).toBe(document.activeElement)
	})
})
