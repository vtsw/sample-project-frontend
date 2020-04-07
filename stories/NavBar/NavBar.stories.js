import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../../src/theme/muiTheme'
import NavBar from './NavBar'
import './navbar.scss'

export default {
	title: 'Component Api|Navbar',
	includeStories: [],
}

const propsDetail = [
	{
		propsName: 'location',
		propsType: 'object',
		defaultValue: 'required',
		description: 'it is props of withRouter() passes to navbar',
	},
	{
		propsName: 'history',
		propsType: 'required',
		defaultValue: `required`,
		description: 'it is props of withRouter() passes to navbar',
	},
]

export const Navbar = () => {
	return (
		<ThemeProvider theme={muiTheme}>
			<NavBar />
		</ThemeProvider>
	)
}
