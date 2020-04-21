import { act, waitFor } from '@testing-library/react'

import waait from 'waait'

import {
	mockMessage,
	openModifyDialog,
	openDeleteDialog,
	modifyMessage,
	findDOMNodeOfMessageList,
	closeDialog,
} from './utils'

describe('<MessageList />', () => {
	let rendered

	beforeEach(() => {
		act(async () => {
			rendered = findDOMNodeOfMessageList()
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
