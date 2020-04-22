import React from 'react'

import { MockedProvider } from '@apollo/react-testing'

import { renderWithRouter } from '@tests/shares/utils'

const resolvers = {
	Query: {
		file: () => {
			return {
				filename: '',
				link: '',
			}
		},
	},
}

const findDOMNodeOfSignIn = component => {
	return renderWithRouter(
		<MockedProvider addTypename={false} resolvers={resolvers}>
			{component}
		</MockedProvider>
	)
}

export { findDOMNodeOfSignIn }
