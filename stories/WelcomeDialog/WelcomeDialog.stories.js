import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'
import WelcomeDialog from '../../src/views/User/components/WelcomeDialog/WelcomeDialog'

export default {
	title: 'Component Api|Welcomedialog',
	includeStories: [],
}

export const basic = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ width: '500px', height: '300px', position: 'relative' }}>
					<WelcomeDialog setDialogVisible={() => {}} />
				</div>
			</div>
		</ThemeProvider>
	)
}
