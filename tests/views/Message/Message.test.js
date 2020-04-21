import wait from 'waait'

import { act, fireEvent } from '@testing-library/react'

import { mockSearchText, mockMessageText, findDOMNodeOfMessage } from './utils'

describe('<Message />', () => {
	let rendered

	beforeEach(async () => {
		await act(async () => {
			rendered = findDOMNodeOfMessage()
		})
	})

	it('should match snapshot', async () => {
		await wait(10)

		expect(rendered).toMatchSnapshot()
	})

	it('should fetch successfully new message list with a search text value', async () => {
		const input = rendered.querySelectorAll('[placeholder="search..."]')[0]
		const searchButton = rendered.querySelectorAll(
			'[data-testid=search-icon]'
		)[0]

		expect(input.value).toBe('')

		await act(async () => {
			fireEvent.change(input, { target: { value: mockSearchText } })
		})

		expect(input.value).toBe(mockSearchText)

		await act(async () => {
			fireEvent.click(searchButton)
		})

		expect(rendered.textContent).toContain(mockSearchText)
	})

	it('should allow creating a valid message', async () => {
		const input = rendered.querySelectorAll('[placeholder="text..."]')[0]
		const saveButton = rendered.querySelectorAll(
			'[data-testid=actioninputbox-button]'
		)[0]

		expect(input.value).toBe('')

		await act(async () => {
			fireEvent.change(input, { target: { value: mockMessageText } })
		})

		expect(input.value).toBe(mockMessageText)

		await act(async () => {
			fireEvent.click(saveButton)
		})

		expect(rendered.textContent).toContain(mockMessageText)
	})

	it('should not allow creating an empty message', async () => {
		const saveButton = rendered.querySelectorAll(
			'[data-testid=actioninputbox-button]'
		)[0]

		jest
			.spyOn(window, 'alert')
			.mockImplementation(
				() =>
					'Error: GraphQL error: "message.content" is not allowed to be empty'
			)

		await act(async () => {
			fireEvent.click(saveButton)
		})

		expect(window.alert).toHaveBeenCalled()
	})
})
