import React from 'react'
import { render } from '@testing-library/react'

import { MockedProvider } from '@apollo/react-testing'

import File from '@views/File'

import { GET_USER_INFO } from '@views/File/gql/query'
import { UPLOAD_FILE } from '@views/File/gql/mutation'

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
						link: 'http://localhost:3000/images',
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
					link: 'http://localhost:3000/images',
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

const findDOMNodeOfFile = () => {
	return render(
		<MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
			<File />
		</MockedProvider>
	)
}

export { fileName, mockFile, findDOMNodeOfFile }
