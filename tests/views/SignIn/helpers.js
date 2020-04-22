import React from 'react'

import { MockedProvider } from '@apollo/react-testing'

import { SIGN_IN } from '@views/SignIn/gql/mutation'
import { mockUser, mockServer, renderWithRouter } from '@tests/shares/utils'

const fileName = 'mockimage.jpg'

const mockFile = new Image(100, 200)
mockFile.src = fileName

const mocks = [
	{
		request: {
			query: SIGN_IN,
			variables: {
				user: { email: mockUser.email, password: mockUser.password },
			},
		},
		result: {
			data: {
				login: {
					token: mockUser.token,
					user: {
						name: mockUser.name,
						email: mockUser.email,
						image: {
							filename: fileName,
							link: mockServer + '/image',
						},
					},
				},
			},
		},
	},
]

const resolvers = {
	Query: {
		file: () => {
			return {
				filename: '',
				link: '',
			}
		},
	},
	Mutation: {
		setUploadedFile: (_, { file }, { cache }) => {
			if (file) {
				cache.writeData({
					data: {
						file,
					},
				})
			}
			return file
		},
	},
}

const findDOMNodeOfSignIn = component => {
	return renderWithRouter(
		<MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
			{component}
		</MockedProvider>
	)
}

export { mockFile, findDOMNodeOfSignIn }
