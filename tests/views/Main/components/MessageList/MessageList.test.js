import { act, waitFor } from '@testing-library/react'

import waait from 'waait'

import {
	mockMessage,
	openModifyDialog,
	openDeleteDialog,
	modifyMessage,
	findDOMNodeOfMessageList,
} from './utils'

describe('MessageList', () => {
	it('should match snapshot', async () => {
		let rendered
		act(async () => {
			rendered = findDOMNodeOfMessageList()
		})

		await waait(10)

		expect(rendered).toMatchSnapshot()
	})

	describe('ModifyDialog', () => {
		let rendered

		beforeEach(() => {
			rendered = findDOMNodeOfMessageList()
		})

		it('should allow to click No button to close dialog', async () => {
			await openModifyDialog(rendered)

			const disagreeButton = document.querySelectorAll(
				`[data-testid=modifydialog-disagreebutton]`
			)[0]

			await act(async () => {
				await disagreeButton.click()
			})

			await waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should allow to modify message', async () => {
			await waait(10)
			await openModifyDialog(rendered)
			await modifyMessage(mockMessage)

			await waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should allow to submit a empty message', async () => {
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

			await waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should allow to click MuiBackdrop-root to close ModifyDialog', async () => {
			await waait(10)
			await openModifyDialog(rendered)

			const MuiBackdrop = document.querySelectorAll(`.MuiBackdrop-root`)[0]

			await act(async () => {
				MuiBackdrop.click()
			})

			await waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})
	})

	describe('DeleteDialog', () => {
		let rendered

		beforeEach(() => {
			rendered = findDOMNodeOfMessageList()
		})

		it('should allow to click Yes button', async () => {
			await waait(10)
			await openDeleteDialog(rendered)

			const agreeButton = document.querySelectorAll(
				`[data-testid=deletedialog-agreebutton]`
			)[0]

			await act(async () => {
				agreeButton.click()
			})

			await waitFor(() => {
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

			await waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=deletedialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('should allow to click MuiBackdrop-root to close DeleteDialog', async () => {
			await waait(10)
			await openDeleteDialog(rendered)

			const MuiBackdrop = document.querySelectorAll(`.MuiBackdrop-root`)[0]

			await act(async () => {
				MuiBackdrop.click()
			})

			await waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=modifydialog-title]`)[0]
				).toBeFalsy()
			})
		})
	})
})
