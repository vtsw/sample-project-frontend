import React from 'react'
import { findDOMNode } from 'react-dom'

import { InfiniteTable } from '@views_components'

import {
	mockUserList,
	mockUserTableHeader,
	renderDOMNode,
	getMarkup,
} from '@tests/shares/utils'

describe('<InfiniteTable />', () => {
	const mockProps = {
		items: mockUserList,
		columns: mockUserTableHeader,
		loadingMore: true,
		loadNextPage: jest.fn(),
	}

	it('should match snapshot', () => {
		const rendered = findDOMNode(
			renderDOMNode(getMarkup(<InfiniteTable {...mockProps} />))
		)
		expect(rendered).toMatchSnapshot()
	})

	it.each(mockProps.columns.map(item => item.headerVariable))(
		'should render %s header correctly',
		item => {
			const rendered = findDOMNode(
				renderDOMNode(getMarkup(<InfiniteTable {...mockProps} />))
			)

			expect(
				rendered.querySelectorAll(`[data-testid=tableheader-${item}]`)[0]
			).toBeTruthy()
		}
	)
})
