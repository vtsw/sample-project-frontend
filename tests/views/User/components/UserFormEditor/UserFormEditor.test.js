import React from 'react'
import { act, cleanup, render } from '@testing-library/react'

import { MockedProvider } from '@apollo/react-testing'

import { UserFormEditor } from '@views/User/components'

const resolvers = {
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

describe('UserFormEditor', () => {
	const mockProps = {
		setDialogVisible: jest.fn(),
	}
	let component

	beforeEach(async () => {
		await act(async () => {
			component = render(
				<MockedProvider resolvers={resolvers}>
					<UserFormEditor {...mockProps} />
				</MockedProvider>
			)
		})
	})

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = component

		expect(container).toMatchSnapshot()
	})
})
