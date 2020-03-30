import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Tables from '../src/views/components/Tables/Tables'
import { ThemeProvider } from '@material-ui/core'
import muiTheme from '../src/theme/muiTheme'
import WelcomeDialog from '../src/views/User/components/WelcomeDialog/WelcomeDialog'

export default {
	title: 'Component Api|Welcomedialog',
}

const propsDetail = [
	{
		propsName: 'setDialogVisible',
		propsType: 'function',
		defaultValue: 'required',
		description:
			'When you click button "Create user", you will run this function',
	},
]

export const Welcomedialog = () => {
	const codeString = `
	import { Welcomedialog } from '@views_components'

	...
	const [dialogVisible, setDialogVisible] = useState(true)

	...

	const handleSetDialogVisible = () => {
		setDialogVisible(false)
	}

	return (
		...
		{dialogVisible ? (
			<WelcomeDialog setDialogVisible={handleSetDialogVisible} />
		) : null}
		...
	)
	`
	return (
		<ThemeProvider theme={muiTheme}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h1>Example</h1>
				<div style={{ width: '500px', height: '300px', position: 'relative' }}>
					<WelcomeDialog setDialogVisible={() => {}} />
				</div>
				<SyntaxHighlighter language='javascript'>
					{codeString}
				</SyntaxHighlighter>

				<h1>Props</h1>

				<Tables data={propsDetail} />
			</div>
		</ThemeProvider>
	)
}
