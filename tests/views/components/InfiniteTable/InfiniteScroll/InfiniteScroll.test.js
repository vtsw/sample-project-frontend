import React from 'react'
import { findDOMNode } from 'react-dom'

import { InfiniteScroll } from '@views_components/InfiniteTable/components'

import { mockUserList, mockUserTableHeader } from '@tests/shares/utils'

import { render } from './utils'

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

	function mockOffsetSize(width, height) {
		Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
			configurable: true,
			value: height,
		})
		Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
			configurable: true,
			value: width,
		})
	}

	function getMarkup({ height = 100, width = 200, props } = {}) {
		mockOffsetSize(width, height)

		return (
			<div style={{ width: '300px', height: '700px' }}>
				<InfiniteScroll {...props} />
			</div>
		)
	}

	it('should match snapshot', async () => {
		const rendered = findDOMNode(render(getMarkup({ props: mockProps })))
		expect(rendered).toMatchSnapshot()
	})

	it('should render list of item without crashing', () => {
		const rendered = findDOMNode(render(getMarkup({ props: mockProps })))

		expect(rendered.textContent).toContain(mockProps.items[0].email)
		expect(rendered.textContent).toContain(mockProps.items[1].email)
		expect(rendered.textContent).toContain(mockProps.items[2].email)
	})

	it('should render list of item with close icon without crashing', () => {
		const rendered = findDOMNode(
			render(getMarkup({ props: { ...mockProps, isIconClose: true } }))
		)

		expect(
			rendered.querySelectorAll(
				`[data-testid=row-closeicon-${mockProps.items[0].id}]`
			)[0]
		).toBeTruthy()
		expect(
			rendered.querySelectorAll(
				`[data-testid=row-closeicon-${mockProps.items[1].id}]`
			)[0]
		).toBeTruthy()
		expect(
			rendered.querySelectorAll(
				`[data-testid=row-closeicon-${mockProps.items[2].id}]`
			)[0]
		).toBeTruthy()
	})

	it('should call onClickRow correctly when click a row', () => {
		const rendered = findDOMNode(render(getMarkup({ props: mockProps })))

		rendered
			.querySelectorAll(`[data-testid=row-${mockProps.items[0].id}]`)[0]
			.click()

		expect(mockProps.onClickRow).toHaveBeenCalled()
	})

	it('should call handleDeleteRow correctly when click close icon at a row', () => {
		const rendered = findDOMNode(
			render(getMarkup({ props: { ...mockProps, isIconClose: true } }))
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
