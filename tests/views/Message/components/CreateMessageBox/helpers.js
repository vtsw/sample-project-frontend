import React from 'react'

import { MockedProvider } from '@apollo/react-testing'

import { renderWithRouter } from '@tests/shares/utils'

const resolvers = {
	Query: {
		messageCreateValueOfMessage: () => {
			return ''
		},
	},
	Mutation: {
		setMessageCreateValueOfMain: (_, { createValue }, { cache }) => {
			cache.writeData({
				data: {
					messageCreateValueOfMessage: createValue,
				},
			})

			return createValue
		},
	},
}

const findDOMNodeOfCreateMessageBox = component => {
	return renderWithRouter(
		<MockedProvider addTypename={false} resolvers={resolvers}>
			{component}
		</MockedProvider>
	)
}

export { findDOMNodeOfCreateMessageBox }
