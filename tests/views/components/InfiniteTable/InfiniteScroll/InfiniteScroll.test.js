import React from 'react'

import { cleanup, render } from '@testing-library/react'

import { InfiniteScroll } from '@views_components/InfiniteTable/components'

import { mockUserList, mockUserTableHeader } from '@tests/shares/utils'

describe('InfiniteScroll', () => {
	const mockProps = {
		hasNextPage: true,
		isNextPageLoading: true,
		isIconClose: false,
		items: mockUserList,
		columns: mockUserTableHeader,
		selectedRow: {},
		loadNextPage: jest.fn(),
		onClickRow: jest.fn(),
		handleDeleteRow: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<InfiniteScroll {...mockProps} />)

		expect(container).toMatchSnapshot()
	})
})
