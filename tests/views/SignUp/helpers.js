import React from 'react'

import { MockedProvider } from '@apollo/react-testing'

import { renderWithRouter } from '@tests/shares/utils'

const findDOMNodeOfSignUp = component => {
	return renderWithRouter(<MockedProvider>{component}</MockedProvider>)
}

export { findDOMNodeOfSignUp }
