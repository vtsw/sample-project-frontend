import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { SearchUserBox } from '@views/User/components'

describe('SearchUserBox', () => {
	const mockProps = {
		type: 'search',
		placeholder: 'search...',
		defaultValue: '',
		width: '350',
		onSubmit: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<SearchUserBox {...mockProps} />)

		expect(container).toMatchSnapshot()
	})
})
