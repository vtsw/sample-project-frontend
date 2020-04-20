import React from 'react'
import { findDOMNode } from 'react-dom'

import { act, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import waait from 'waait'

import { MessageList } from '@views/Main/components'

import {
	mockUserList,
	mockMessageList,
	renderDOMNode,
	getMarkup,
} from '@tests/shares/utils'
import { FETCH_USER_LIST } from '@views/User/gql/query'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { DELETE_MESSAGE, UPDATE_MESSAGE } from '@views/Message/gql/mutation'
import { PAGE_LIMIT } from '@src/configs.local'

const mocks = [
	{
		request: {
			query: FETCH_USER_LIST,
			variables: {
				query: { limit: PAGE_LIMIT },
			},
		},
		result: {
			data: {
				userList: {
					items: mockUserList,
					hasNext: true,
				},
			},
		},
	},
	{
		request: {
			query: MESSAGE_LIST,
			variables: {
				query: { userId: mockUserList[0].id, limit: PAGE_LIMIT },
			},
		},
		result: {
			data: {
				messageList: {
					items: mockMessageList,
					hasNext: true,
					total: 30,
				},
			},
		},
	},
	{
		request: {
			query: DELETE_MESSAGE,
			variables: {
				id: mockUserList[0].id,
			},
		},
		result: {
			data: {
				deleteMessage: mockMessageList[0],
			},
		},
	},
]

const resolvers = {
	Query: {
		userSearchValueOfMain: () => {
			return ''
		},
		selectedUserOfMain: () => {
			return mockUserList[0]
		},
	},
	Mutation: {
		setUserSearchValueOfMain: (_, { searchValue }, { cache }) => {
			cache.writeData({
				data: {
					userSearchValueOfMain: searchValue,
				},
			})
			return searchValue
		},
	},
}

const openModifyDialog = async rendered => {
	const row = rendered.querySelectorAll(
		`[data-testid=row-${mockMessageList[0].id}]`
	)[0]

	await act(async () => {
		await row.click()
	})

	const modifyDialogTitle = document.querySelectorAll(
		`[data-testid=modifydialog-title]`
	)[0]

	expect(modifyDialogTitle).toBeTruthy()
}

const openDeleteDialog = async rendered => {
	const closeIcon = rendered.querySelectorAll(
		`[data-testid=row-closeicon-${mockMessageList[0].id}]`
	)[0]

	fireEvent.click(closeIcon)

	const deleteDialogTitle = document.querySelectorAll(
		`[data-testid=deletedialog-title]`
	)[0]

	expect(deleteDialogTitle).toBeTruthy()
}

const modifyMessage = async message => {
	const input = document.querySelectorAll(`[placeholder=placeholder]`)[0]
	const agreeButton = document.querySelectorAll(
		'[data-testid=modifydialog-agreebutton]'
	)[0]

	await act(async () => {
		fireEvent.change(input, { target: { value: message } })
	})

	expect(input.value).toBe(message)

	await act(async () => {
		await agreeButton.click()
	})
}

describe('MessageList', async () => {
	it('should match snapshot', async () => {
		const rendered = findDOMNode(
			renderDOMNode(
				getMarkup(
					<MockedProvider
						mocks={mocks}
						addTypename={false}
						resolvers={resolvers}
					>
						<MessageList />
					</MockedProvider>
				)
			)
		)
		await act(async () => {
			await waait(10)
		})

		expect(rendered).toMatchSnapshot()
	})

	describe('ModifyDialog', () => {
		let rendered

		beforeEach(() => {
			rendered = findDOMNode(
				renderDOMNode(
					getMarkup(
						<MockedProvider
							mocks={mocks}
							addTypename={false}
							resolvers={resolvers}
						>
							<MessageList />
						</MockedProvider>
					)
				)
			)
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
			await modifyMessage('nvdai')

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

		it('should allow to click MuiBackdrop-root to close dialog', async () => {
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
			rendered = findDOMNode(
				renderDOMNode(
					getMarkup(
						<MockedProvider
							mocks={mocks}
							addTypename={false}
							resolvers={resolvers}
						>
							<MessageList />
						</MockedProvider>
					)
				)
			)
		})
		it('allow to click Yes button', async () => {
			jest
				.spyOn(window, 'alert')
				.mockImplementation(() => 'Error: GraphQL error')
			await waait(10)
			await openDeleteDialog(rendered)

			const agreeButton = document.querySelectorAll(
				`[data-testid=deletedialog-agreebutton]`
			)[0]

			await act(async () => {
				agreeButton.click()
			})

			expect(window.alert).toHaveBeenCalled()

			await waitFor(() => {
				expect(
					document.querySelectorAll(`[data-testid=deletedialog-title]`)[0]
				).toBeFalsy()
			})
		})

		it('allow to click No button', async () => {
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
		it('allow to click MuiBackdrop-root to close dialog', async () => {
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
