import React, { useState } from 'react'
import ModifyDialog from '../../src/views/components/ModifyDialog/ModifyDialog'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Component Api|Modifydialog',
	includeStories: [],
}

export const basic = () => {
	const [openPopup, setOpenPopup] = useState(false)
	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<button
						onClick={() => {
							setOpenPopup(true)
							action('Open popup')()
						}}
					>
						Open popup
					</button>
				</div>
				<ModifyDialog
					open={openPopup}
					onClose={() => {
						setOpenPopup(false)
						action('Close popup')()
					}}
					onAgree={() => {
						action('Agree action')()
						setOpenPopup(false)
					}}
					onDisagree={() => {
						setOpenPopup(false)
						action('Cancel action')()
					}}
				/>
			</div>
		</ThemeProvider>
	)
}
