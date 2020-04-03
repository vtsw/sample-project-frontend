import React from 'react'
import Largetable from './Largetable'
import { withKnobs } from '@storybook/addon-knobs'
import muiTheme from '../../src/theme/muiTheme'
import { ThemeProvider } from '@material-ui/core'

export default {
	title: 'Component Api|LargeTable',
	decorators: [withKnobs],
}

export const LargeTable = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<Largetable />
		</ThemeProvider>
	)
}
