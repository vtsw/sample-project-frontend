import React from 'react'

import { act, fireEvent } from '@testing-library/react'
import waait from 'waait'

import { UserList } from '@views/Main/components'

import { mockSearchText, findDOMNodeOfUserList } from './helpers'

describe('<UserList />', async () => {
	let rendered

	beforeEach(() => {
		jest.setTimeout(10000)
		rendered = findDOMNodeOfUserList(<UserList />)
	})

	it('should match snapshot', async () => {
		await act(async () => {
			await waait(10)
		})

		expect(rendered).toMatchSnapshot()
	})

	it('should fetch successfully new user list with a new search text value', async () => {
		const searchInput = rendered.querySelectorAll(
			'[placeholder="search..."]'
		)[0]
		const searchButton = rendered.querySelectorAll(
			'[data-testid=actioninputbox-button]'
		)[0]

		expect(searchInput.value).toBe('')

		await act(async () => {
			fireEvent.change(searchInput, { target: { value: mockSearchText } })
		})

		expect(searchInput.value).toBe(mockSearchText)

		await act(async () => {
			await searchButton.click()
		})

		expect(rendered.textContent).toContain(mockSearchText)
	})
})
