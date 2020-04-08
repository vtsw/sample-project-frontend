import React from 'react'

import { createMockClient } from 'mock-apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'

import { render, fireEvent, cleanup } from '@testing-library/react'

import { FormEditor } from '@views_components'

import { renderWithRouter } from '@tests/shares/utils'

import { initialState, resolvers } from '@src/client'

describe('FormEditor', () => {
	const cache = new InMemoryCache()
	cache.writeData({
		data: initialState,
	})
	const mockClient = createMockClient({
		cache,
		resolvers,
	})

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = renderWithRouter(
			<ApolloProvider client={mockClient}>
				<FormEditor />
			</ApolloProvider>
		)

		expect(container).toMatchSnapshot()
	})

	it('should render Sign up form without crashing', () => {
		const { getByText, getByTestId } = renderWithRouter(
			<ApolloProvider client={mockClient}>
				<FormEditor />
			</ApolloProvider>
		)

		expect(getByText('Sign up')).toBeTruthy()
		expect(getByTestId('formeditor-email-input')).toBeTruthy()
		expect(getByTestId('formeditor-name-input')).toBeTruthy()
		expect(getByTestId('formeditor-password-input')).toBeTruthy()
		expect(getByTestId('formeditor-password-confirm-input')).toBeTruthy()
		expect(getByTestId('formeditor-submit-button')).toBeTruthy()
		expect(getByTestId('formeditor-cancel-button')).toBeTruthy()
	})

	// it('should call correctly onAgree function when click Yes button', () => {
	// 	const props = { ...mockProps, open: true }
	// 	const { getByText } = render(<FormEditor {...props} />)

	// 	const yesButton = getByText('Yes')

	// 	fireEvent.click(yesButton)

	// 	expect(props.onAgree).toHaveBeenCalled()
	// })
})
