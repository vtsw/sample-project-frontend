import React from 'react'

import { act, fireEvent, render } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import { mockUserList } from '@tests/shares/utils'
import { DELETE_USER } from '@views/User/gql/mutation'

const mocks = [
	{
		request: {
			query: DELETE_USER,
			variables: {
				id: mockUserList[0].id,
			},
		},
		result: {
			data: {
				deleteUser: mockUserList[0],
			},
		},
	},
]

const resolvers = {
	Query: {
		userSearchValue: () => {
			return ''
		},
		selectedUser: () => {
			return {
				id: '',
				name: '',
				email: '',
			}
		},
	},
}

const findDOMNodeOfUserFormEditor = (component, mockResolvers = resolvers) => {
	return render(
		<MockedProvider mocks={mocks} resolvers={mockResolvers} addTypename={false}>
			{component}
		</MockedProvider>
	)
}

const openDeleteDialog = async component => {
	let rendered
	const userResolvers = {
		...resolvers,
		Query: {
			userSearchValue: () => {
				return ''
			},
			selectedUser: () => {
				return mockUserList[0]
			},
			userList: () => {
				return {
					items: mockUserList,
					hasNext: true,
					total: mockUserList.length,
				}
			},
		},
	}
	await act(async () => {
		rendered = findDOMNodeOfUserFormEditor(component, userResolvers)
	})
	const { getByTestId, queryByTestId } = rendered
	const deleteButton = getByTestId('formeditor-delete-button')

	fireEvent.click(deleteButton)
	expect(deleteButton).toBeTruthy()
	expect(getByTestId('deletedialog-title')).toBeTruthy()
	return { getByTestId, queryByTestId }
}

export { findDOMNodeOfUserFormEditor, openDeleteDialog }
