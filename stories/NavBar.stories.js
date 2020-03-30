import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import Tables from '../src/views/components/Tables/Tables'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../src/theme/muiTheme'
import { NavBarWithoutRouter } from '@views/components'
import '../src/story.scss'

export default {
	title: 'Component Api|Navbar',
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
	const codeString = `
	import { NavBar } from '@views_components'

	...

	return (
		...
		<NavBar />
		...
	)
	`
	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h1>Example</h1>
				<div style={{ width: '100px', listStyle: 'none' }}>
					<NavBarWithoutRouter />
				</div>{' '}
				<SyntaxHighlighter language='javascript'>
					{codeString}
				</SyntaxHighlighter>
				<h1>Props</h1>
				<Tables data={propsDetail} />
			</div>
		</ThemeProvider>
	)
}
