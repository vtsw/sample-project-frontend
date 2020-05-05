import React from 'react'
import { render } from '@testing-library/react'

import { MockedProvider } from '@apollo/react-testing'

import { GET_USER_INFO } from '@views/File/gql/query'
import { UPLOAD_FILE } from '@views/File/gql/mutation'
import { mockServer } from '@tests/shares/utils'

const fileName = 'mockimage.jpg'

const mockFile = new Image(100, 200)

mockFile.src = fileName

const mocks = [
	{
		request: {
			query: GET_USER_INFO,
		},
		result: {
			data: {
				me: {
					image: {
						filename: fileName,
						link: mockServer + '/image',
					},
				},
			},
		},
	},
	{
		request: {
			query: UPLOAD_FILE,
			variables: {
				file: mockFile,
			},
		},
		result: {
			data: {
				uploadImage: {
					filename: fileName,
					link: mockServer + '/image',
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

const findDOMNodeOfFile = component => {
	return render(
		<MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
			{component}
		</MockedProvider>
	)
}

export { fileName, mockFile, findDOMNodeOfFile }
