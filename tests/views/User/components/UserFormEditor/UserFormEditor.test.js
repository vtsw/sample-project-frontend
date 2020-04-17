import React from 'react'
import {
	act,
	cleanup,
	fireEvent,
	render,
	waitFor,
} from '@testing-library/react'

import { MockedProvider } from '@apollo/react-testing'

import { UserFormEditor } from '@views/User/components'

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
	Mutation: {
		setUserSearchValue: (_, { searchValue }, { cache }) => {
			cache.writeData({
				data: {
					userSearchValue: searchValue,
				},
			})
			return searchValue
		},
	},
}

const openDeleteDialog = async mockProps => {
	let component
	const userResolvers = {
		...resolvers,
		Query: {
			userSearchValue: () => {
				return ''
			},
			selectedUser: () => {
				return {
					id: '123',
					name: 'dai',
					email: 'nvdai123@gmail.com',
				}
			},
		},
	}
	await act(async () => {
		component = render(
			<MockedProvider resolvers={userResolvers} addTypename={false}>
				<UserFormEditor {...mockProps} />
			</MockedProvider>
		)
	})
	const { getByTestId, queryByTestId } = component
	const deleteButton = getByTestId('formeditor-delete-button')

	fireEvent.click(deleteButton)
	expect(deleteButton).toBeTruthy()
	expect(getByTestId('deletedialog-title')).toBeTruthy()
	return { getByTestId, queryByTestId }
}

describe('UserFormEditor', () => {
	const mockProps = {
		setDialogVisible: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', async () => {
		let component
		await act(async () => {
			component = render(
				<MockedProvider resolvers={resolvers} addTypename={false}>
					<UserFormEditor {...mockProps} />
				</MockedProvider>
			)
		})
		const { container } = component

		expect(container).toMatchSnapshot()
	})

	it('should open DeleteDialog when click Delete button and enable to click Yes button of DeleteDialog', async () => {
		jest.spyOn(window, 'alert').mockImplementation(() => 'Error!!!')
		const { getByTestId, queryByTestId } = await openDeleteDialog(mockProps)
		const agreeButton = getByTestId('deletedialog-agreebutton')
		await act(async () => {
			fireEvent.click(agreeButton)
		})

		await waitFor(() => expect(queryByTestId('deletedialog-title')).toBeFalsy())
	})

	it('should open DeleteDialog when click Delete button and enable to click No button of DeleteDialog', async () => {
		const { getByTestId, queryByTestId } = await openDeleteDialog(mockProps)
		const disagreeButton = getByTestId('deletedialog-disagreebutton')
		await act(async () => {
			fireEvent.click(disagreeButton)
		})

		await waitFor(() => expect(queryByTestId('deletedialog-title')).toBeFalsy())
	})
})
