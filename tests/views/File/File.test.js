import waait from 'waait'

import { act, fireEvent } from '@testing-library/react'

import { findDOMNodeOfFile, fileName, mockFile } from './utils'

describe('<File />', () => {
	it('should match snapshot', async () => {
		let component
		await act(async () => {
			component = findDOMNodeOfFile()
		})

		expect(component.container).toMatchSnapshot()
	})

	it('should upload file and show file name correctly', async () => {
		await waait(10)
		let component
		await act(async () => {
			component = findDOMNodeOfFile()
		})

		const inputElement = component.getByTestId('file-input')

		fireEvent.change(inputElement, { target: { files: [mockFile] } })
		fireEvent.input(inputElement)

		expect(component.queryByText(fileName)).toBeTruthy()
	})
})
