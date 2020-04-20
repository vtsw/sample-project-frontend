import React from 'react'
import { findDOMNode } from 'react-dom'

import { act, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

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

const mockMessage = 'abc'

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
					total: mockMessageList.length,
				},
			},
		},
	},
	{
		request: {
			query: DELETE_MESSAGE,
			variables: {
				id: mockMessageList[0].id,
			},
		},
		result: {
			data: {
				deleteMessage: mockMessageList[0],
			},
		},
	},
	{
		request: {
			query: UPDATE_MESSAGE,
			variables: {
				message: { id: mockMessageList[0].id, content: mockMessage },
			},
		},
		result: {
			data: {
				updateMessage: mockMessageList[0],
			},
		},
	},
]

const resolvers = {
	Query: {
		selectedUserOfMain: () => {
			return mockUserList[0]
		},
	},
}

const openModifyDialog = async rendered => {
	const row = rendered.querySelectorAll(
		`[data-testid=row-${mockMessageList[0].id}]`
	)[0]

	await act(async () => {
		fireEvent.click(row)
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

	await act(async () => {
		fireEvent.click(closeIcon)
	})

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
		fireEvent.click(agreeButton)
	})
}

const findDOMNodeOfMessageList = () => {
	return findDOMNode(
		renderDOMNode(
			getMarkup(
				<MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
					<MessageList />
				</MockedProvider>
			)
		)
	)
}

const closeDialog = async () => {
	const MuiBackdrop = document.querySelectorAll(`.MuiBackdrop-root`)[0]

	await act(async () => {
		MuiBackdrop.click()
	})
}

export {
	mockMessage,
	mocks,
	resolvers,
	openModifyDialog,
	openDeleteDialog,
	modifyMessage,
	findDOMNodeOfMessageList,
	closeDialog,
}
