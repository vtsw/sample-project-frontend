import React from 'react'

import { MockedProvider } from '@apollo/react-testing'

import { renderWithRouter } from '@tests/shares/utils'

const resolvers = {
	Mutation: {
		resetCache: (_, { data }, { cache }) => {
			cache.writeData({
				data,
			})

			return data
		},
	},
}

const findDOMNodeOfNavPanel = component => {
	return renderWithRouter(
		<MockedProvider addTypename={false} resolvers={resolvers}>
			{component}
		</MockedProvider>
	)
}

export { findDOMNodeOfNavPanel }
