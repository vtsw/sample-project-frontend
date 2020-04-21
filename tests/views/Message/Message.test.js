import React from 'react'

import waait from 'waait'

import { act, fireEvent, waitFor } from '@testing-library/react'

import Message from '@views/Message'

import {
	openModifyDialog,
	openDeleteDialog,
	modifyMessage,
	closeDialog,
} from '@tests/shares/utils'
import { findDOMNodeOfMessage, mockSearchText, mockMessage } from './utils'

describe('<Message />', () => {
	let rendered

	beforeEach(async () => {
		await act(async () => {
			rendered = findDOMNodeOfMessage(<Message />)
		})
	})

	it('should match snapshot', async () => {
		await waait(10)

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
			fireEvent.change(input, { target: { value: mockMessage } })
		})

		expect(input.value).toBe(mockMessage)

		await act(async () => {
			fireEvent.click(saveButton)
		})

		expect(rendered.textContent).toContain(mockMessage)
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

	describe('ModifyDialog', () => {
		it('should allow to click No button to close dialog', async () => {
			await openModifyDialog(rendered)

			const disagreeButton = document.querySelectorAll(
				`[data-testid=modifydialog-disagreebutton]`
			)[0]

			await act(async () => {
				await disagreeButton.click()
			})

			waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should allow to modify message', async () => {
			await waait(10)
			await openModifyDialog(rendered)
			await modifyMessage(mockMessage)

			waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should not allow to submit a empty message', async () => {
			jest
				.spyOn(window, 'alert')
				.mockImplementation(
					() =>
						'Error: GraphQL error: "message.content" is not allowed to be empty'
				)
			await waait(10)
			await openModifyDialog(rendered)
			await modifyMessage('')

			expect(window.alert).toHaveBeenCalled()

			waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should allow to click MuiBackdrop-root to close ModifyDialog', async () => {
			await waait(10)
			await openModifyDialog(rendered)
			await closeDialog()

			waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})
	})

	describe('DeleteDialog', () => {
		it('should allow to click Yes button', async () => {
			await waait(10)
			await openDeleteDialog(rendered)

			const agreeButton = document.querySelectorAll(
				`[data-testid=deletedialog-agreebutton]`
			)[0]

			await act(async () => {
				agreeButton.click()
			})

			waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=deletedialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should allow to click No button', async () => {
			await waait(10)
			await openDeleteDialog(rendered)

			const disagreeButton = document.querySelectorAll(
				`[data-testid=deletedialog-disagreebutton]`
			)[0]

			await act(async () => {
				disagreeButton.click()
			})

			waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=deletedialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should allow to click MuiBackdrop-root to close DeleteDialog', async () => {
			await waait(10)
			await openDeleteDialog(rendered)
			await closeDialog()

			waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=deletedialog-title]`)[0]
				).toBeFalsy()
			})
		})
	})
})
