import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { light } from 'react-syntax-highlighter/dist/esm/styles/prism'

import Tables from '../src/views/components/Tables/Tables'
import BoxCreate from '../src/views/Message/components/BoxCreate/BoxCreate'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../src/theme/muiTheme'

export default {
	title: 'Component Api|Boxcreate',
}

const propsDetail = [
	{
		propsName: 'handleCreate',
		propsType: 'function',
		defaultValue: 'required',
		description:
			'When you click button "Save", you will run this function, what contain value of input nearby.',
	},
	{
		propsName: 'defaultValue',
		propsType: 'string',
		defaultValue: `''`,
		description: 'It is a default value of input',
	},
]

export const Boxcreate = () => {
	const codeString = `
	import { BoxCreate } from '@views_components'

	...

	const handleCreate = (inputValue) => {
		// inputValue
	}

	return (
		...
		<BoxCreate handleCreate={handleCreate} />
		...
	)
	`
	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h1>Example</h1>

				<div>
					<BoxCreate handleCreate={() => {}} />
				</div>
				<SyntaxHighlighter language='javascript' style={light}>
					{codeString}
				</SyntaxHighlighter>

				<h1>Props</h1>

				<Tables data={propsDetail} />
			</div>
		</ThemeProvider>
	)
}
