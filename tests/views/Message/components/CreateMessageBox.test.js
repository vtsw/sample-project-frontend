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
		const props = { ...mockProps }
		const { container } = renderWithApolloClient(
			<CreateMessageBox {...props} />,
			mockClient
		)

		expect(container).toMatchSnapshot()
	})

	it('should render a input with "text..." placeholder and a button with "Save" title', () => {
		let props = { ...mockProps }
		const { getByPlaceholderText, getByText } = renderWithApolloClient(
			<CreateMessageBox {...props} />,
			mockClient
		)

		expect(getByPlaceholderText(props.placeholder)).toBeTruthy()
		expect(getByText('Save')).toBeTruthy()
	})

	it('should call correctly onSubmit function when click "Save" button', () => {
		const props = { ...mockProps }
		const { getByText } = renderWithApolloClient(
			<CreateMessageBox {...props} />,
			mockClient
		)

		fireEvent.click(getByText('Save'))

		expect(props.onSubmit).toHaveBeenCalled()
	})

	it('should change value of input', async () => {
		const props = { ...mockProps }
		const { getByPlaceholderText } = renderWithApolloClient(
			<CreateMessageBox {...props} />,
			mockClient
		)
		const input = getByPlaceholderText(props.placeholder)

		expect(input.value).toBe('')

		await act(async () => {
			fireEvent.change(input, {
				target: { value: 'Hello world' },
			})
		})

		expect(input.value).toBe('Hello world')
	})

	it('should enable input when focus on input', async () => {
		const props = { ...mockProps }
		const { getByPlaceholderText } = renderWithApolloClient(
			<CreateMessageBox {...props} />,
			mockClient
		)
		const input = getByPlaceholderText(props.placeholder)

		act(() => {
			input.focus()
		})

		expect(input).toBe(document.activeElement)
	})
})
