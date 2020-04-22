import React from 'react'

import { act, fireEvent } from '@testing-library/react'
import waait from 'waait'

import { UserList } from '@views/User/components'

import { mockSearchedUser } from '@tests/shares/utils'
import { findDOMNodeOfUserList } from './helpers'

describe('UserList', () => {
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
		const input = rendered.querySelectorAll('[placeholder="search..."]')[0]
		const searchButton = rendered.querySelectorAll(
			'[data-testid=actioninputbox-button]'
		)[0]

		expect(input.value).toBe('')

		fireEvent.change(input, { target: { value: mockSearchedUser.email } })

		expect(input.value).toBe(mockSearchedUser.email)

		await act(async () => {
			await searchButton.click()
		})

		expect(rendered.textContent).toContain(mockSearchedUser.email)
	})
})
