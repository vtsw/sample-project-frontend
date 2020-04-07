import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'
import NavBar from './NavBar'
import './navbar.scss'

export default {
	title: 'Component Api|Navbar',
	includeStories: [],
}

export const Navbar = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<NavBar />
		</ThemeProvider>
	)
}
