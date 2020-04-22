import React from 'react'

import { act, cleanup, fireEvent, waitFor } from '@testing-library/react'

import { UserFormEditor } from '@views/User/components'

import { findDOMNodeOfUserFormEditor, openDeleteDialog } from './helpers'

describe('<UserFormEditor />', () => {
	const mockProps = {
		setDialogVisible: jest.fn(),
	}

	afterEach(() => {
		cleanup()
	})

	it('should match snapshot', async () => {
		let component
		await act(async () => {
			component = findDOMNodeOfUserFormEditor(<UserFormEditor {...mockProps} />)
		})
		const { container } = component

		expect(container).toMatchSnapshot()
	})

	it('should open DeleteDialog when click Delete button and enable to click Yes button', async () => {
		const { getByTestId, queryByTestId } = await openDeleteDialog(
			<UserFormEditor {...mockProps} />
		)
		const agreeButton = getByTestId('deletedialog-agreebutton')
		await act(async () => {
			fireEvent.click(agreeButton)
		})

		await waitFor(() => expect(queryByTestId('deletedialog-title')).toBeFalsy())
	})

	it('should open DeleteDialog when click Delete button and enable to click No button', async () => {
		const { getByTestId, queryByTestId } = await openDeleteDialog(
			<UserFormEditor {...mockProps} />
		)
		const disagreeButton = getByTestId('deletedialog-disagreebutton')
		await act(async () => {
			fireEvent.click(disagreeButton)
		})

		await waitFor(() => expect(queryByTestId('deletedialog-title')).toBeFalsy())
	})
})
