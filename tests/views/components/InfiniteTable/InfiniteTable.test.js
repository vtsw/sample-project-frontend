import React from 'react'

import { cleanup, render } from '@testing-library/react'

import { InfiniteTable } from '@views_components'

import { mockUserList, mockUserTableHeader } from '@tests/shares/utils'

describe('InfiniteTable', () => {
	const mockProps = {
		items: mockUserList,
		columns: mockUserTableHeader,
		loadingMore: true,
		loadNextPage: jest.fn(),
	}

	const headerItems = mockProps.columns.map(item => item.headerVariable)

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', () => {
		const { container } = render(<InfiniteTable {...mockProps} />)

		expect(container).toMatchSnapshot()
	})

	it.each(headerItems)('should render %s header correctly', item => {
		const { getByTestId } = render(<InfiniteTable {...mockProps} />)
		const headerTestId = `tableheader-${item}`

		expect(getByTestId(headerTestId)).toBeTruthy()
	})
})
