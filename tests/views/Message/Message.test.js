import wait from 'waait'

import { act, fireEvent } from '@testing-library/react'

import { mockSearchText, findDOMNodeOfMessage } from './utils'

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

	it('should fetch successfully new user list with a new search text value', async () => {
		const input = rendered.querySelectorAll('[placeholder="search..."]')[0]
		const searchButton = rendered.querySelectorAll(
			'[data-testid=actioninputbox-button]'
		)[0]

		expect(input.value).toBe('')

		await act(async () => {
			fireEvent.change(input, { target: { value: mockSearchText } })
		})

		expect(input.value).toBe(mockSearchText)

		await act(async () => {
			await searchButton.click()
		})

		// expect(rendered.textContent).toContain(mockSearchText)
	})
})
