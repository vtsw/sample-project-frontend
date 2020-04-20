import React from 'react'
import { findDOMNode } from 'react-dom'

import { InfiniteScroll } from '@views_components/InfiniteTable/components'

import {
	mockUserList,
	mockUserTableHeader,
	renderDOMNode,
	getMarkup,
} from '@tests/shares/utils'

describe('InfiniteScroll', () => {
	const mockProps = {
		itemCounter: 10,
		hasNextPage: true,
		isNextPageLoading: false,
		isIconClose: false,
		items: mockUserList,
		columns: mockUserTableHeader,
		selectedRow: {},
		loadNextPage: jest.fn(),
		onClickRow: jest.fn(),
		handleDeleteRow: jest.fn(),
	}

	it('should match snapshot', async () => {
		const rendered = findDOMNode(
			renderDOMNode(getMarkup(<InfiniteScroll {...mockProps} />))
		)
		expect(rendered).toMatchSnapshot()
	})

	it('should render list of item without crashing', () => {
		const rendered = findDOMNode(
			renderDOMNode(getMarkup(<InfiniteScroll {...mockProps} />))
		)

		expect(rendered.textContent).toContain(mockProps.items[0].email)
		expect(rendered.textContent).toContain(mockProps.items[1].email)
		expect(rendered.textContent).toContain(mockProps.items[2].email)
	})

	it('should call onClickRow correctly when click a row', () => {
		const rendered = findDOMNode(
			renderDOMNode(getMarkup(<InfiniteScroll {...mockProps} />))
		)

		rendered
			.querySelectorAll(`[data-testid=row-${mockProps.items[0].id}]`)[0]
			.click()

		expect(mockProps.onClickRow).toHaveBeenCalled()
	})

	it('should call handleDeleteRow correctly when click close icon at a row', () => {
		const props = { ...mockProps, isIconClose: true }
		const rendered = findDOMNode(
			renderDOMNode(getMarkup(<InfiniteScroll {...props} />))
		)

		rendered
			.querySelectorAll(
				`[data-testid=row-closeicon-${mockProps.items[0].id}]`
			)[0]
			.onclick(() => {
				expect(mockProps.handleDeleteRow).toHaveBeenCalled()
			})
	})
})
