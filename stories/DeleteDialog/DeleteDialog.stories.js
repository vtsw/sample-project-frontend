import React, { useState } from 'react'
import DeleteDialog from '../../src/views/components/DeleteDialog/DeleteDialog'
import { action } from '@storybook/addon-actions'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'

export default {
	title: 'Component Api|Deletedialog',
	includeStories: [],
}

export const basic = () => {
	const [openPopup, setOpenPopup] = useState(false)

	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<button
						onClick={e => {
							setOpenPopup(true)
							action('Open popup')()
						}}
					>
						Open popup
					</button>
					<DeleteDialog
						open={openPopup}
						onClose={() => {
							setOpenPopup(false)
							action('Close popup')()
						}}
						onAgree={() => {
							setOpenPopup(false)
							action('Delete action')()
						}}
						onDisagree={() => {
							setOpenPopup(false)
							action('Close popup')()
						}}
					/>
				</div>
			</div>
		</ThemeProvider>
	)
}
