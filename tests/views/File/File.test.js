import React from 'react'

import waait from 'waait'
import { act, fireEvent } from '@testing-library/react'

import File from '@views/File'

import { findDOMNodeOfFile, fileName, mockFile } from './helpers'

describe('<File />', () => {
	let component

	beforeEach(async () => {
		await act(async () => {
			component = findDOMNodeOfFile(<File />)
		})
	})
	it('should match snapshot', async () => {
		expect(component.container).toMatchSnapshot()
	})

	it('should upload file and show file name correctly', async () => {
		await waait(10)
		global.URL.createObjectURL = jest.fn()

		const inputElement = component.getByTestId('file-input')

		await act(async () => {
			fireEvent.change(inputElement, { target: { files: [mockFile] } })
			fireEvent.input(inputElement)
		})

		expect(component.queryByText(fileName)).toBeTruthy()
	})
})
