import React from 'react'
import waait from 'waait'

import { act, waitFor } from '@testing-library/react'

import { MessageList } from '@views/Main/components'

import {
	openModifyDialog,
	openDeleteDialog,
	modifyMessage,
	closeDialog,
} from '@tests/shares/utils'
import { mockMessage, findDOMNodeOfMessageList } from './helpers'

describe('<MessageList />', () => {
	let rendered

	beforeEach(() => {
		act(async () => {
			rendered = findDOMNodeOfMessageList(<MessageList />)
		})
	})
	it('should match snapshot', async () => {
		await waait(10)

		expect(rendered).toMatchSnapshot()
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

			const modifyDialog = await waitFor(() => {
				return document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
			})

			expect(modifyDialog).toBeTruthy()
		})

		it('should allow to modify message', async () => {
			await waait(10)
			await openModifyDialog(rendered)
			await modifyMessage(mockMessage)

			const modifyDialog = await waitFor(() => {
				return document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
			})

			expect(modifyDialog).toBeTruthy()
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

			const modifyDialog = await waitFor(() => {
				return document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
			})

			expect(modifyDialog).toBeTruthy()
		})

		it('should allow to click MuiBackdrop-root to close ModifyDialog', async () => {
			await waait(10)
			await openModifyDialog(rendered)
			await closeDialog()

			const modifyDialog = await waitFor(() => {
				return document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
			})

			expect(modifyDialog).toBeTruthy()
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
			const deleteDialog = await waitFor(() => {
				return document.querySelectorAll(`[data-testid=deletedialog-title]`)[0]
			})

			expect(deleteDialog).toBeTruthy()
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

			const deleteDialog = await waitFor(() => {
				return document.querySelectorAll(`[data-testid=deletedialog-title]`)[0]
			})

			expect(deleteDialog).toBeTruthy()
		})

		it('should allow to click MuiBackdrop-root to close DeleteDialog', async () => {
			await waait(10)
			await openDeleteDialog(rendered)
			await closeDialog()

			const deleteDialog = await waitFor(() => {
				return document.querySelectorAll(`[data-testid=deletedialog-title]`)[0]
			})

			expect(deleteDialog).toBeTruthy()
		})
	})
})
