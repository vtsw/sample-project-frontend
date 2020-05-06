import React from 'react'

import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

const findDOMNodeOfSignIn = component => {
	return render(<MockedProvider>{component}</MockedProvider>)
}

export { findDOMNodeOfSignIn }
