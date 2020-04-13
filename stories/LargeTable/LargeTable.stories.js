import React from 'react'
import Largetable from './Largetable'
import muiTheme from '../../src/theme/muiTheme'
import { ThemeProvider } from '@material-ui/core'

export default {
	title: 'Component Api|LargeTable',
	includeStories: [],
}

export const basic = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<Largetable />
		</ThemeProvider>
	)
}
